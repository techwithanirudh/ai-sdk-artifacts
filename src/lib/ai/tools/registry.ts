// Tool metadata for title generation and UI display
export const toolMetadata = {
	getDataAnalysis: {
		name: 'getDataAnalysis',
		title: 'Data Analysis',
		description:
			'Generate comprehensive data analysis with interactive visualizations, and actionable insights',
	}
} as const;

export type ToolName = keyof typeof toolMetadata;