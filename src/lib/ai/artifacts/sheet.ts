import { artifact } from '@ai-sdk-tools/artifacts';
import { z } from 'zod';
import { toastSchema } from '../tools/schema';

export const sheetArtifact = artifact(
	'sheet',
	z.object({
		// Processing stage
		stage: z.enum([
			'loading',
			'query_ready',
			'chart_planning',
			'chart_ready',
			'metrics_ready',
			'analysis_ready',
		]),

		toast: toastSchema,

		// Table preview of rows
		data: z.array(z.record(z.string(), z.any())).optional(),

		// Analysis: summary + recommendations
		analysis: z
			.object({
				summary: z.string(),
				recommendations: z.array(z.string()),
			})
			.optional(),
	})
);