<script lang="ts">
	export let checked: boolean;
	export let value: string;
</script>

<input class="sr-only" type="radio" on:change {checked} {value} id={value} name="speed" />
<label for={value} class="label" class:checked class:unchecked={!checked}>
	<span class="sr-only">{value}</span>
	<span class="w-6 h-6 inline-block"><slot /></span>
</label>

<style lang="postcss">
	.label {
		@apply overflow-hidden cursor-pointer border-surface-500 shadow transition-colors inline-flex p-2 border rounded-md border-opacity-40;
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
