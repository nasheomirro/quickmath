<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let disabled: boolean;
	export let guess: string;

	let dispatch = createEventDispatcher<{
		enter: null;
	}>();

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') dispatch('enter');
	};
</script>

<input {disabled} bind:value={guess} on:keydown={handleKeyDown} />
