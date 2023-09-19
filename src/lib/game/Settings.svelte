<script lang="ts">
	import type { SettingsType } from '$lib/types';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { settings } from './settings';

	const findOp = (operation: SettingsType['operations'][number]) =>
		Boolean($settings.operations.find((op) => op === operation));

	const handleCheckbox =
		(operation: SettingsType['operations'][number]): ChangeEventHandler<HTMLInputElement> =>
		(e) => {
			if (e.currentTarget.checked) {
				$settings.operations.push(operation);
				$settings.operations = $settings.operations;
			} else {
				$settings.operations = $settings.operations.filter((op) => op !== operation);
			}
		};
</script>

<form>
	<label>
		<input checked={findOp('+')} on:change={handleCheckbox('+')} type="checkbox" />
		<span>addition</span>
	</label>
	<label>
		<input checked={findOp('-')} on:change={handleCheckbox('-')} type="checkbox" />
		<span>subtraction</span>
	</label>
	<label>
		<input checked={findOp('*')} on:change={handleCheckbox('*')} type="checkbox" />
		<span>multiplication</span>
	</label>
	<label>
		<input checked={findOp('/')} on:change={handleCheckbox('/')} type="checkbox" />
		<span>division</span>
	</label>
</form>
