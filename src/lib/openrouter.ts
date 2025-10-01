export interface Model {
	id: string;
	name: string;
	context_length?: number;
	pricing?: { prompt?: string | number; completion?: string | number };
	top_provider?: { context_length: number; max_completion_tokens: number | null; is_moderated: boolean };
}

export async function fetchFreeModels() {
	const res = await fetch('https://openrouter.ai/api/v1/models');

	const json: any = await res.json();
	const data = json.data;
	const freeModels = data.filter((m: Model) => {
		const p = m.pricing;
		if (!p) return false;

		// Must have both prompt AND completion at exactly 0
		const promptFree = p.prompt === '0' || p.prompt === 0;
		const completionFree = p.completion === '0' || p.completion === 0;
		return promptFree && completionFree;
	});

	if (freeModels.length > 0) {
		const firstModel = freeModels[0];
		return {
			id: firstModel.id,
			name: firstModel.name,
			context_length: firstModel.top_provider?.context_length || 0,
		};
	} else {
		return null;
	}
}
