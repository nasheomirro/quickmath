<script lang="ts">
	import type { Challenge } from '$lib/types';
	import { tick } from 'svelte';
	import Input from './Input.svelte';
	import { generateChallenge } from './generator';
	import { highscore } from './highscore';
	import { SPEEDMAP, settings } from '$lib/settings/settings';

	let score = 0;
	let state: 'idle' | 'ongoing' | 'finished' = 'idle';
	let challenge: Challenge;

	let guess: string;
	let timerId: NodeJS.Timeout;

	let input: Input;
	let newHighscore: boolean = false;

	function newGame() {
		state = 'ongoing';
		score = 0;
		newHighscore = false;
		nextChallenge();
		tick().then(() => input.focus());
	}

	function nextChallenge() {
		guess = '';
		challenge = generateChallenge($settings, score);
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			state = 'finished';
		}, SPEEDMAP[$settings.speed]);
	}

	function submitAnswer() {
		if (parseFloat(guess) === challenge.answer) {
			score++;
			nextChallenge();
		} else {
			state = 'finished';
			newHighscore = highscore.reviewScore($settings.speed, score);
		}
	}
</script>

<div class="pt-24 pb-4 flex flex-col items-center">
	{#if state === 'idle'}
		<button
			class="py-2 px-10 bg-primary-600 border hover:brightness-105 border-surface-300 text-xl shadow font-bold rounded-lg"
			on:click={newGame}>start</button
		>
	{:else}
		<div class="flex flex-col">
			<span class="text-center mb-2 text-surface-700">score: {score}</span>
			<span class="text-4xl md:text-6xl mb-8 md:mb-12 font-bold text-center"
				>{challenge.question}</span
			>
			<Input bind:this={input} disabled={state !== 'ongoing'} bind:guess on:enter={submitAnswer} />
		</div>
	{/if}
</div>

{#if state === 'finished'}
	<div class="flex flex-col gap-6 items-center">
		<p class="text-center text-surface-500">the correct answer was {challenge.answer}</p>
		<button
			class="py-2 px-10 bg-primary-600 border hover:brightness-105 border-surface-300 text-xl shadow font-bold rounded-lg"
			on:click={newGame}>play again</button
		>
	</div>
{/if}
