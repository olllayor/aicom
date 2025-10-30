#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
};

function log(text) {
	console.log(text);
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function showAnimatedLogo() {
	const lines = [
		`${colors.bright}${colors.magenta} ▄▄▄       ██▓ ▄████▄   ▒█████   ███▄ ▄███▓${colors.reset}`,
		`${colors.bright}${colors.magenta}▒████▄    ▓██▒▒██▀ ▀█  ▒██▒  ██▒▓██▒▀█▀ ██▒${colors.reset}`,
		`${colors.bright}${colors.yellow}▒██  ▀█▄  ▒██▒▒▓█    ▄ ▒██░  ██▒▓██    ▓██░${colors.reset}`,
		`${colors.bright}${colors.yellow}░██▄▄▄▄██ ░██░▒▓▓▄ ▄██▒▒██   ██░▒██    ▒██ ${colors.reset}`,
		`${colors.bright}${colors.cyan} ▓█   ▓██▒░██░▒ ▓███▀ ░░ ████▓▒░▒██▒   ░██▒${colors.reset}`,
		`${colors.bright}${colors.cyan} ▒▒   ▓▒█░░▓  ░ ░▒ ▒  ░░ ▒░▒░▒░ ░ ▒░   ░  ░${colors.reset}`,
		`${colors.bright}${colors.green}  ▒   ▒▒ ░ ▒ ░  ░  ▒     ░ ▒ ▒░ ░  ░      ░${colors.reset}`,
		`${colors.bright}${colors.green}  ░   ▒    ▒ ░░        ░ ░ ░ ▒  ░      ░   ${colors.reset}`,
		`${colors.bright}${colors.blue}      ░  ░ ░  ░ ░          ░ ░         ░   ${colors.reset}`,
		`${colors.bright}${colors.blue}              ░                            ${colors.reset}`,
	];

	for (const line of lines) {
		log(line);
		await sleep(80);
	}
}

async function showProgress(steps) {
	for (let i = 0; i < steps.length; i++) {
		const step = steps[i];
		process.stdout.write(`${colors.cyan}[${i + 1}/${steps.length}]${colors.reset} `);
		await sleep(300);
		process.stdout.write(`${colors.green}✓${colors.reset} ${step}\n`);
		await sleep(200);
	}
}

async function main() {
	// Show logo
	await showAnimatedLogo();
	log('');

	// Installation progress
	await showProgress(['Package installed globally', 'Dependencies bundled', 'CLI configured', 'Ready to use']);

	log('');
	log(`${colors.bright}${colors.green}✨ Installation Complete!${colors.reset}`);
	log('');

	// Setup instructions
	log(`${colors.bright}${colors.blue}📋 Setup Instructions:${colors.reset}`);
	log(`  ${colors.yellow}1.${colors.reset} Get your OpenRouter API key:`);
	log(`     ${colors.dim}https://openrouter.ai/keys${colors.reset}`);
	log('');
	log(`  ${colors.yellow}2.${colors.reset} Set the API key in your environment:`);
	log(`     ${colors.bright}export OPENROUTER_API_KEY=your_key_here${colors.reset}`);
	log('');
	log(`  ${colors.yellow}3.${colors.reset} Stage your changes:`);
	log(`     ${colors.bright}git add <files>${colors.reset}`);
	log('');

	// Usage
	log(`${colors.bright}${colors.blue}🚀 Quick Start:${colors.reset}`);
	log(`     ${colors.bright}${colors.cyan}aicom${colors.reset}`);
	log('');

	log(`${colors.bright}${colors.magenta}Happy committing! 🎉${colors.reset}`);
	log('');
}

main()
	.catch((error) => {
		console.error(`${colors.red}Error during installation:${colors.reset}`, error);
		process.exit(1);
	})
	.finally(() => {
		// Ensure output is flushed
		process.stdout.write('');
	});
