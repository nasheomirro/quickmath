<script lang="ts">
	export let name: string;
	export let checked: boolean;
</script>

<input class="sr-only" type="checkbox" id={name} {name} {checked} on:change />
<label for={name} class="label" class:checked class:unchecked={!checked}>
	<span class="sr-only">{name}</span>
	<span class="inline-block w-6 h-6"><slot /></span>
</label>

<style lang="postcss">
	.label {
		@apply overflow-hidden cursor-pointer border-surface-500 shadow transition-colors 
		inline-flex p-2 border rounded-md border-opacity-40;
	}

	.label.checked {
		@apply bg-primary-600;
	}

	.label.unchecked {
		@apply text-surface-500 bg-surface-100;
	}

	input:focus + .label {
		@apply outline outline-surface-300;
	}
</style>
