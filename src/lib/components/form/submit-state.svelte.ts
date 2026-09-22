import type { SubmitFunction } from '@sveltejs/kit';
import type { SubmitState } from './Submit.svelte';

type Result = Parameters<Exclude<Awaited<ReturnType<SubmitFunction>>, void>>[0];

/**
 * Tracks a form's submit lifecycle for the Submit button and resets to idle
 * after showing success/failure for a moment. Use with `use:enhance`.
 */
export class FormSubmitState {
	state = $state<SubmitState>('idle');
	#timer: ReturnType<typeof setTimeout> | undefined;
	#resetAfter: number;

	constructor(resetAfter = 2000) {
		this.#resetAfter = resetAfter;
	}

	/** Returns a `use:enhance` callback; `onResult` runs after the page data was updated. */
	enhance(onResult?: (event: Result) => void | Promise<void>): SubmitFunction {
		return () => {
			this.state = 'loading';
			return async (event) => {
				const ok = event.result.type === 'success' || event.result.type === 'redirect';
				this.state = ok ? 'success' : 'failure';
				clearTimeout(this.#timer);
				this.#timer = setTimeout(() => (this.state = 'idle'), this.#resetAfter);
				await event.update({ reset: false });
				await onResult?.(event);
			};
		};
	}
}
