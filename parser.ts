export interface Model {
	id: string;
	name: string;
	context_length?: number;
	pricing?: { prompt?: string | number; completion?: string | number };
	top_provider?: {
		context_length: number;
		max_completion_tokens: number | null;
		is_moderated: boolean;
	};
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
		// Sort by speed indicators (smallest context = fastest)
		const sortedBySpeed = freeModels.sort((a: Model, b: Model) => {
			const aContext = a.top_provider?.context_length || a.context_length || Infinity;
			const bContext = b.top_provider?.context_length || b.context_length || Infinity;

			// Prioritize models with "flash" or "turbo" in name (speed indicators)
			const aIsFast = /flash|turbo|mini|instant/i.test(a.name || a.id);
			const bIsFast = /flash|turbo|mini|instant/i.test(b.name || b.id);

			if (aIsFast && !bIsFast) return -1;
			if (!aIsFast && bIsFast) return 1;

			// Then sort by context length (smaller = faster)
			return aContext - bContext;
		});

		const fastestModel = sortedBySpeed[0];
		const result = {
			id: fastestModel.id,
			name: fastestModel.name,
			context_length: fastestModel.top_provider?.context_length || fastestModel.context_length || 0,
		};
		console.log('Fastest free model:', result);
		return result;
	} else {
		console.log('No free models found');
		return null;
	}
}

// Alternative: Get top N fastest free models
export async function fetchTopFastestFreeModels(limit: number = 5) {
	const res = await fetch('https://openrouter.ai/api/v1/models');

	const json: any = await res.json();
	const data = json.data;

	const freeModels = data.filter((m: Model) => {
		const p = m.pricing;
		if (!p) return false;

		const promptFree = p.prompt === '0' || p.prompt === 0;
		const completionFree = p.completion === '0' || p.completion === 0;
		return promptFree && completionFree;
	});

	// Sort by speed indicators
	const sortedBySpeed = freeModels.sort((a: Model, b: Model) => {
		const aContext = a.top_provider?.context_length || a.context_length || Infinity;
		const bContext = b.top_provider?.context_length || b.context_length || Infinity;

		// Prioritize speed-focused models
		const aIsFast = /flash|turbo|mini|instant/i.test(a.name || a.id);
		const bIsFast = /flash|turbo|mini|instant/i.test(b.name || b.id);

		if (aIsFast && !bIsFast) return -1;
		if (!aIsFast && bIsFast) return 1;

		return aContext - bContext;
	});

	const result = sortedBySpeed.slice(0, limit).map((model: Model) => ({
		id: model.id,
		name: model.name,
		context_length: model.top_provider?.context_length || model.context_length || 0,
	}));
	console.log(`Top ${limit} fastest free models:`, result);
	return result;
}

fetchFreeModels();
fetchTopFastestFreeModels();
