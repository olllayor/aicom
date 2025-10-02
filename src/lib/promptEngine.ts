import { PromptTemplate } from '../types';

export const DEFAULT_SYSTEM_PROMPT = `Generate git commit messages in conventional commit format.

STRICT RULES:
- Format: type(scope): description
- Types: feat, fix, docs, style, refactor, test, chore
- First line MUST be ≤30 characters (hard limit)
- Use imperative mood: "add" not "added" or "adds"
- NO body, NO explanations, NO bullet points
- Output ONLY the commit message, nothing else

Focus on the primary change. If multiple changes, choose the most significant.`;

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
