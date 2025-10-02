import { AIConfig } from '../types';

export async function generateCommitMessage(diff: string, systemPrompt: string, config: AIConfig): Promise<string> {
	const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${config.apiKey}`,
			'Content-Type': 'application/json',
			'HTTP-Referer': 'https://github.com/olllayor/aicom',
			'X-Title': 'AI Commit Generator',
		},
		body: JSON.stringify({
			model: config.modelId,
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: diff },
			],
		}),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
	}

	const data: any = await response.json();

	if (!data.choices || data.choices.length === 0) {
		throw new Error('No response from AI model');
	}

	return data.choices[0].message.content.trim();
}

export async function generateCommitMessageStream(
	diff: string,
	systemPrompt: string,
	config: AIConfig,
	onChunk: (text: string) => void,
): Promise<string> {
	const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${config.apiKey}`,
			'Content-Type': 'application/json',
			'HTTP-Referer': 'https://github.com/olllayor/aicom',
			'X-Title': 'AI Commit Generator',
		},
		body: JSON.stringify({
			model: config.modelId,
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: diff },
			],
			stream: true,
		}),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
	}

	let fullMessage = '';
	const reader = response.body?.getReader();
	const decoder = new TextDecoder();

	if (!reader) {
		throw new Error('No response body');
	}

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		const chunk = decoder.decode(value);
		const lines = chunk.split('\n').filter((line) => line.trim().startsWith('data:'));

		for (const line of lines) {
			const data = line.replace(/^data: /, '');
			if (data === '[DONE]') continue;

			try {
				const parsed = JSON.parse(data);
				const content = parsed.choices?.[0]?.delta?.content;
				if (content) {
					fullMessage += content;
					onChunk(content);
				}
			} catch {
				// Skip invalid JSON
			}
		}
	}

	return fullMessage.trim();
}
