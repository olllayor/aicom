import { PromptTemplate } from '../types';

export const DEFAULT_SYSTEM_PROMPT = `You are an expert at writing clear, concise git commit messages following best practices.

Rules:
- Use conventional commit format: type(scope): description
- Types: feat, fix, docs, style, refactor, test, chore
- Keep the first line under 72 characters
- Use present tense ("add feature" not "added feature")
- Be specific and descriptive
- Focus on WHAT changed and WHY, not HOW

Generate a commit message based on the provided git diff.`;

export const SIMPLE_TEMPLATE: PromptTemplate = {
	system: DEFAULT_SYSTEM_PROMPT,
	userPrefix: 'Generate a commit message for these changes:\n\n',
};

export function buildPrompt(
	diff: string,
	template: PromptTemplate = SIMPLE_TEMPLATE,
): { system: string; user: string } {
	return {
		system: template.system,
		user: `${template.userPrefix}${diff}`,
	};
}

export function createCustomPrompt(instructions: string): PromptTemplate {
	return {
		system: `${DEFAULT_SYSTEM_PROMPT}\n\nAdditional instructions: ${instructions}`,
		userPrefix: 'Generate a commit message for these changes:\n\n',
	};
}
