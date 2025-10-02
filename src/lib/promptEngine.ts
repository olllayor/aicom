import { PromptTemplate } from '../types';

export const DEFAULT_SYSTEM_PROMPT = `Generate a concise git commit message in conventional commit format.

STRICT RULES:
- Format: type(scope): description
- Types: feat, fix, docs, style, refactor, test, chore
- Maximum 50 characters total
- Use imperative mood: "add" not "added"
- Describe the change, NOT the new content
- NO quotes, NO explanations, output ONLY the message

Examples:
- docs(readme): update installation steps
- feat(auth): add password reset flow
- fix(api): handle null user response`;

export const SIMPLE_TEMPLATE: PromptTemplate = {
	system: DEFAULT_SYSTEM_PROMPT,
	userPrefix: 'Diff:\n\n',
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
		userPrefix: 'Diff:\n\n',
	};
}
