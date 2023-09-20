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

<input bind:this={input} {disabled} bind:value={guess} on:keydown={handleKeyDown} />
