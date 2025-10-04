import type { InferUITools } from 'ai';
import { getContext } from './context';
import { getSheetTool } from './tools/get-sheet';

export const createToolRegistry = () => {
	const _context = getContext();

	return {
		getSheet: getSheetTool,
	};
};

export type UITools = InferUITools<ReturnType<typeof createToolRegistry>>;