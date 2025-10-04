import { z } from 'zod';

export type Row = Record<string, unknown>;

export const toastSchema = z
	.object({
		visible: z.boolean(),
		currentStep: z.number().min(0),
		totalSteps: z.number().min(1),
		currentLabel: z.string(),
		stepDescription: z.string().optional(),
		completed: z.boolean().optional(),
		completedMessage: z.string().optional(),
	})
	.optional();

export const getSheetSchema = z.object({
	prompt: z.string().min(5, 'Please describe what you want to analyze'),
	showCanvas: z
		.boolean()
		.default(false)
		.describe(
			'Whether to show detailed visual analytics. Use true for in-depth analysis requests, trends, breakdowns, or when user asks for charts/visuals. Use false for simple questions or quick answers.'
		),
	maxRows: z
		.number()
		.optional()
		.describe('The maximum number of rows to return.')
});