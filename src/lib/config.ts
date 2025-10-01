import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { AIConfig } from '../types';

const CONFIG_DIR = path.join(os.homedir(), '.aicom');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

interface StoredConfig {
	apiKey?: string;
	modelId?: string;
	modelName?: string;
}

export function loadConfig(): Partial<AIConfig> {
	try {
		if (!fs.existsSync(CONFIG_FILE)) {
			return {};
		}
		const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
		return JSON.parse(data);
	} catch {
		return {};
	}
}

export function saveConfig(config: Partial<AIConfig>): void {
	try {
		if (!fs.existsSync(CONFIG_DIR)) {
			fs.mkdirSync(CONFIG_DIR, { recursive: true });
		}
		fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
	} catch (error) {
		throw new Error(`Failed to save config: ${error}`);
	}
}

export function getApiKey(): string | undefined {
	// Check environment variable first
	const envKey = process.env.OPENROUTER_API_KEY;
	if (envKey) return envKey;

	// Then check config file
	const config = loadConfig();
	return config.apiKey;
}

export function setApiKey(apiKey: string): void {
	const config = loadConfig();
	config.apiKey = apiKey;
	saveConfig(config);
}

export function hasApiKey(): boolean {
	return !!getApiKey();
}
