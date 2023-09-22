<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let disabled: boolean;
	export let guess: string;

	let input: HTMLInputElement;

	let dispatch = createEventDispatcher<{
		enter: null;
	}>();

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') dispatch('enter');
	};

	export function focus() {
		input.focus();
	}
</script>

<input
	class="text-lg md:text-xl text-center disabled:text-surface-300 disabled:cursor-not-allowed text-primary-800 font-semibold focus-visible:outline-primary-600 focus-visible:outline border border-surface-300 p-2 md:p-4 rounded-full"
	bind:this={input}
	{disabled}
	bind:value={guess}
	on:keydown={handleKeyDown}
/>
