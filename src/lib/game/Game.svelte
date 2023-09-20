<script lang="ts">
	import type { Challenge } from '$lib/types';
	import { tick } from 'svelte';
	import Input from './Input.svelte';
	import { generateChallenge } from './generator';
	import { settings, SPEEDMAP } from './settings';
	import { highscore } from './highscore';

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

{#if state === 'idle'}
	<button on:click={newGame}>start</button>
{:else}
	<div>
		<h1>{challenge.question}</h1>
		<Input bind:this={input} disabled={state !== 'ongoing'} bind:guess on:enter={submitAnswer} />
	</div>
{/if}

{#if state === 'finished'}
	<h1>Score: {score}</h1>
	{#if newHighscore}
		<span>new high score!</span>
	{/if}
	<p>the correct answer was {challenge.answer}</p>
	<button on:click={newGame}>play again</button>
{/if}
