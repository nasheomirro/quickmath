<script lang="ts">
	import type { SettingsType, SpeedCategory } from '$lib/types';
	import { settings } from './settings';

	import Checkbox from './Checkbox.svelte';
	import SpeedRadio from './SpeedRadio.svelte';
	import Cog from '$lib/icons/Cog.svelte';
	import Plus from '$lib/icons/Plus.svelte';
	import Minus from '$lib/icons/Minus.svelte';
	import Times from '$lib/icons/Times.svelte';
	import Divider from '$lib/icons/Divider.svelte';
	import Turtle from '$lib/icons/Turtle.svelte';
	import Rabbit from '$lib/icons/Rabbit.svelte';
	import Eagle from '$lib/icons/Eagle.svelte';
	import { join } from '$lib/utils';

	let showMenu = false;

	const findOperation = (
		arr: SettingsType['operations'],
		operation: SettingsType['operations'][number]
	) => {
		return Boolean(arr.find((op) => op === operation));
	};

	const handleOperation = (operation: SettingsType['operations'][number]) => {
		return (e: Event) => {
			const target = e.currentTarget as HTMLInputElement;
			if (target.checked) {
				$settings.operations.push(operation);
				$settings.operations = $settings.operations;
			} else {
				$settings.operations = $settings.operations.filter((op) => op !== operation);
			}
		};
	};

	const handleSpeed = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		$settings.speed = target.value as SpeedCategory;
	};
</script>

<div class="relative flex">
	<button class="ml-auto md:hidden" on:click={() => (showMenu = !showMenu)}>
		<span class="sr-only">settings</span>
		<span class={join(' transition w-8 inline-block', showMenu && 'rotate-90')}><Cog /></span>
	</button>
	<form
		class={join(
			showMenu ? 'hidden' : 'flex',
			'md:flex flex-col md:flex-row md:py-10 md:px-0 md:shadow-none md:border-none md:bg-[transparent] bg-surface-50  shadow border border-surface-300 rounded-lg gap-3 justify-between p-5',
			'absolute top-full left-0 w-full md:static'
		)}
	>
		<div>
			<span class="block mb-1 text-primary-700 font-semibold">operations</span>
			<div class="flex gap-3">
				<Checkbox
					name="addition"
					checked={findOperation($settings.operations, '+')}
					on:change={handleOperation('+')}
				>
					<Plus />
				</Checkbox>
				<Checkbox
					name="subtraction"
					checked={findOperation($settings.operations, '-')}
					on:change={handleOperation('-')}
				>
					<Minus />
				</Checkbox>
				<Checkbox
					name="multiplication"
					checked={findOperation($settings.operations, '*')}
					on:change={handleOperation('*')}
				>
					<Times />
				</Checkbox>
				<Checkbox
					name="division"
					checked={findOperation($settings.operations, '/')}
					on:change={handleOperation('/')}
				>
					<Divider />
				</Checkbox>
			</div>
		</div>

		<div>
			<span class="block mb-1 text-primary-700 font-semibold">speed</span>

			<div class="flex gap-3">
				<SpeedRadio checked={$settings.speed === 'classic'} value="classic" on:change={handleSpeed}>
					<Turtle />
				</SpeedRadio>
				<SpeedRadio checked={$settings.speed === 'blitz'} value="blitz" on:change={handleSpeed}>
					<Rabbit />
				</SpeedRadio>
				<SpeedRadio checked={$settings.speed === 'bullet'} value="bullet" on:change={handleSpeed}>
					<Eagle />
				</SpeedRadio>
			</div>
		</div>
	</form>
</div>
