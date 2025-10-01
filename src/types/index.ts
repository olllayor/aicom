export interface StagedFile {
	path: string;
	status: string; // 'modified', 'added', 'deleted', etc.
	diff: string;
}

export interface CommitMessage {
	title: string;
	body?: string;
	full: string;
}

export interface AIConfig {
	apiKey: string;
	modelId: string;
	modelName: string;
}

export interface PromptTemplate {
	system: string;
	userPrefix: string;
}
