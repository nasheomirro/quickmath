<script lang="ts">
	import type { SettingsType } from '$lib/types';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { settings } from './settings';

	const findOperation = (operation: SettingsType['operations'][number]) =>
		Boolean($settings.operations.find((op) => op === operation));

	const handleOperation = (
		operation: SettingsType['operations'][number]
	): ChangeEventHandler<HTMLInputElement> => {
		return (e) => {
			if (e.currentTarget.checked) {
				$settings.operations.push(operation);
				$settings.operations = $settings.operations;
			} else {
				$settings.operations = $settings.operations.filter((op) => op !== operation);
			}
		};
	};

	const handleSpeed: ChangeEventHandler<HTMLInputElement> = (e) => {
		$settings.speed = e.currentTarget.value as SettingsType['speed'];
	};
</script>

<form>
	<div>
		<label>
			<input
				name="addition"
				checked={findOperation('+')}
				on:change={handleOperation('+')}
				type="checkbox"
			/>
			<span>addition</span>
		</label>
		<label>
			<input
				name="subtraction"
				checked={findOperation('-')}
				on:change={handleOperation('-')}
				type="checkbox"
			/>
			<span>subtraction</span>
		</label>
		<label>
			<input
				name="multiplication"
				checked={findOperation('*')}
				on:change={handleOperation('*')}
				type="checkbox"
			/>
			<span>multiplication</span>
		</label>
		<label>
			<input
				name="division"
				checked={findOperation('/')}
				on:change={handleOperation('/')}
				type="checkbox"
			/>
			<span>division</span>
		</label>
	</div>

	<div>
		<label>
			<input
				type="radio"
				on:change={handleSpeed}
				checked={$settings.speed === 'classic'}
				name="speed"
				value="classic"
			/>
			<span>classic</span>
		</label>
		<label>
			<input
				type="radio"
				on:change={handleSpeed}
				checked={$settings.speed === 'blitz'}
				name="speed"
				value="blitz"
			/>
			<span>blitz</span>
		</label>
		<label>
			<input
				type="radio"
				on:change={handleSpeed}
				checked={$settings.speed === 'bullet'}
				name="speed"
				value="bullet"
			/>
			<span>bullet</span>
		</label>
	</div>
</form>
