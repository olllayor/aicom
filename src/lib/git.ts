import { execSync } from 'child_process';
import { StagedFile } from '../types';

export function getStagedFiles(): StagedFile[] {
	try {
		// Get list of staged files with their status
		const output = execSync('git diff --cached --name-status', { encoding: 'utf-8' });

		if (!output.trim()) {
			return [];
		}

		const files: StagedFile[] = [];
		const lines = output.trim().split('\n');

		for (const line of lines) {
			const [status, path] = line.split('\t');
			const diff = getStagedDiff(path);

			files.push({
				path,
				status: mapGitStatus(status),
				diff,
			});
		}

		return files;
	} catch (error) {
		throw new Error(`Failed to get staged files: ${error}`);
	}
}

export function getStagedDiff(filePath?: string): string {
	try {
		const command = filePath ? `git diff --cached -- "${filePath}"` : 'git diff --cached';

		return execSync(command, { encoding: 'utf-8' });
	} catch (error) {
		throw new Error(`Failed to get diff: ${error}`);
	}
}

export function getAllStagedDiff(): string {
	return getStagedDiff();
}

export function isGitRepository(): boolean {
	try {
		execSync('git rev-parse --git-dir', { encoding: 'utf-8', stdio: 'pipe' });
		return true;
	} catch {
		return false;
	}
}

export function hasStagedChanges(): boolean {
	try {
		const output = execSync('git diff --cached --name-only', { encoding: 'utf-8' });
		return output.trim().length > 0;
	} catch {
		return false;
	}
}

function mapGitStatus(status: string): string {
	const statusMap: Record<string, string> = {
		M: 'modified',
		A: 'added',
		D: 'deleted',
		R: 'renamed',
		C: 'copied',
		U: 'updated',
	};

	return statusMap[status] || status;
}
