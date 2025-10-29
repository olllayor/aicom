import { PromptTemplate } from '../types';

/**
 * Commit type definitions following Conventional Commits specification
 * References:
 * - https://www.conventionalcommits.org/
 * - https://github.com/conventional-changelog/commitlint
 */
const COMMIT_TYPES = {
	feat: 'A new feature or capability',
	fix: 'A bug fix',
	docs: 'Documentation only changes',
	style: 'Code style changes (formatting, white-space, semicolons, etc) - no logic changes',
	refactor: 'Code restructuring without changing behavior or fixing bugs',
	perf: 'Performance improvements',
	test: 'Adding or updating tests',
	build: 'Changes to build system or external dependencies (npm, webpack, etc)',
	ci: 'Changes to CI/CD configuration (GitHub Actions, CircleCI, etc)',
	chore: 'Maintenance tasks, tooling changes, no production code changes',
	revert: 'Reverts a previous commit',
};

export const DEFAULT_SYSTEM_PROMPT = `You are an expert at writing concise, meaningful git commit messages following the Conventional Commits specification.

COMMIT MESSAGE FORMAT:
type(scope): description

WHERE:
- type: Choose from the types below based on what the diff accomplishes
- scope: Optional, indicates what part of codebase changed (e.g., auth, api, ui, config)
- description: Brief summary in imperative mood

AVAILABLE TYPES:
${Object.entries(COMMIT_TYPES)
	.map(([type, desc]) => `- ${type}: ${desc}`)
	.join('\n')}

CRITICAL RULES:
1. LENGTH: Maximum 50 characters total (including type, scope, and description)
2. MOOD: Use imperative mood - "add" not "added" or "adds"
3. CASE: Lowercase only, no capitalization
4. FOCUS: Describe what the change DOES, not what it contains
5. OUTPUT: Return ONLY the commit message, nothing else - no quotes, no explanations, no markdown

GOOD EXAMPLES:
- feat(auth): add password reset flow
- fix(api): handle null user response
- docs(readme): update installation steps
- refactor(parser): simplify token handling
- perf(search): optimize query indexing

BAD EXAMPLES:
- "Added new authentication feature" (quoted, wrong mood, too vague)
- feat: authentication system with password reset (too long)
- Fix bug (missing type format, not descriptive)
- feat(auth): Added a new password reset feature for users (capitalized, wrong mood, too long)

ANALYZING THE DIFF:
1. Identify the primary purpose of the change
2. Select the most appropriate type
3. Determine if a scope would add clarity (keep it short!)
4. Write a concise description that captures the essence
5. Ensure total length stays under 50 characters

Remember: Your entire response will be passed directly to git commit. Be precise and concise.`;

export const SIMPLE_TEMPLATE: PromptTemplate = {
	system: DEFAULT_SYSTEM_PROMPT,
	userPrefix: 'Git diff to summarize:\n\n',
};

export function buildPrompt(
	diff: string,
	template: PromptTemplate = SIMPLE_TEMPLATE,
	options?: {
		maxLength?: number;
		locale?: string;
		allowScope?: boolean;
	},
): { system: string; user: string } {
	let systemPrompt = template.system;

	// Apply custom options if provided
	if (options) {
		const customizations: string[] = [];

		if (options.maxLength && options.maxLength !== 50) {
			customizations.push(`OVERRIDE: Maximum length is ${options.maxLength} characters (not 50).`);
		}

		if (options.locale && options.locale !== 'en') {
			customizations.push(`LANGUAGE: Write the commit message in ${options.locale}.`);
		}

		if (options.allowScope === false) {
			customizations.push(`SCOPE: Do not include scope. Use format: type: description`);
		}

		if (customizations.length > 0) {
			systemPrompt = `${systemPrompt}\n\n${customizations.join('\n')}`;
		}
	}

	return {
		system: systemPrompt,
		user: `${template.userPrefix}${diff}`,
	};
}

export function createCustomPrompt(instructions: string, maxLength: number = 50): PromptTemplate {
	return {
		system: `${DEFAULT_SYSTEM_PROMPT}\n\nADDITIONAL REQUIREMENTS:\n${instructions}\n\nRemember: Maximum ${maxLength} characters total.`,
		userPrefix: 'Git diff to summarize:\n\n',
	};
}
