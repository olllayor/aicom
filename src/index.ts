#!/usr/bin/env node

import { isGitRepository, hasStagedChanges, getAllStagedDiff } from './lib/git';
import { buildPrompt } from './lib/promptEngine';
import { generateCommitMessage } from './lib/aiService';
import { getApiKey, hasApiKey } from './lib/config';
import { fetchFreeModels } from './lib/openrouter';

// Simple loading animation
function showLoader(message: string): NodeJS.Timeout {
	const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
	let i = 0;
	process.stdout.write(message);
	return setInterval(() => {
		process.stdout.write(`\r${message} ${frames[i++ % frames.length]}`);
	}, 80);
}

function stopLoader(loader: NodeJS.Timeout) {
	clearInterval(loader);
	process.stdout.write('\r');
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
	let loader = showLoader('🤖 Finding AI model...');
	const model = await fetchFreeModels();
	stopLoader(loader);

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

	// Generate commit message with loading indicator
	loader = showLoader('✨ Generating commit message...');
	try {
		const commitMessage = await generateCommitMessage(prompt.user, prompt.system, {
			apiKey,
			modelId: model.id,
			modelName: model.name,
		});
		stopLoader(loader);

		// Extract first line (main commit message)
		const firstLine = commitMessage.split('\n')[0].trim();
		
		// Output the git command directly
		console.log(`git commit -m "${firstLine}"`);
	} catch (error) {
		stopLoader(loader);
		console.error('❌ Failed to generate commit message:', error);
		process.exit(1);
	}
}

main().catch((error) => {
	console.error('❌ Error:', error);
	process.exit(1);
});
