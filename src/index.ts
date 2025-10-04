#!/usr/bin/env node

import { isGitRepository, hasStagedChanges, getAllStagedDiff } from './lib/git';
import { buildPrompt } from './lib/promptEngine';
import { generateCommitMessageStream } from './lib/aiService';
import { getApiKey, hasApiKey } from './lib/config';
import { fetchFreeModels } from './lib/openrouter';
import { execSync } from 'child_process';
import * as readline from 'readline';

// Wait for user to press Enter
function waitForEnter(message: string): Promise<void> {
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		rl.question(`${message}`, () => {
			rl.close();
			resolve();
		});
	});
}

async function main() {
	// Check if we're in a git repository
	if (!isGitRepository()) {
		console.error('❌ Not a git repository');
		process.exit(1);
	}

	// Check for staged changes
	if (!hasStagedChanges()) {
		console.error('❌ No staged changes. Stage your changes first: git add <files>');
		process.exit(1);
	}

	// Check for API key
	if (!hasApiKey()) {
		console.error('❌ OpenRouter API key not found');
		console.error('Set it: export OPENROUTER_API_KEY=your_key');
		console.error('Get key: https://openrouter.ai/keys');
		process.exit(1);
	}

	const apiKey = getApiKey()!;

	// Fetch a free model silently
	const model = await fetchFreeModels();

	if (!model) {
		console.error('❌ No free models available');
		process.exit(1);
	}

	// Get staged diff
	const diff = getAllStagedDiff();

	if (!diff) {
		console.error('❌ No diff found');
		process.exit(1);
	}

	// Build prompt
	const prompt = buildPrompt(diff);

	// Generate commit message with streaming
	try {
		// Show the command prefix
		process.stdout.write('git commit -m "');
		
		let commitMessage = '';
		
		// Use streaming to show response as it comes
		await generateCommitMessageStream(
			prompt.user, 
			prompt.system, 
			{
				apiKey,
				modelId: model.id,
				modelName: model.name,
			},
			(chunk) => {
				// Display chunk in yellow color
				process.stdout.write(`\x1b[33m${chunk}\x1b[0m`);
				commitMessage += chunk;
			}
		);
		
		// Close the quote
		process.stdout.write('"');

		// Extract first line (main commit message)
		const firstLine = commitMessage.split('\n')[0].trim();

		// Wait for Enter
		await waitForEnter('');

		// Execute the commit directly
		execSync(`git commit -m "${firstLine.replace(/"/g, '\\"')}"`, {
			stdio: 'inherit',
		});
	} catch (error) {
		console.error('❌ Error:', error);
		process.exit(1);
	}
}

main().catch((error) => {
	console.error('❌ Error:', error);
	process.exit(1);
});
