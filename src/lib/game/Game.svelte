<script lang="ts">
	import type { Challenge } from '$lib/types';
	import Input from './Input.svelte';
	import { generateChallenge } from './generator';
	import { settings } from './settings';

	let score = 0;
	let state: 'idle' | 'ongoing' | 'finished' = 'idle';
	let challenge: Challenge;

	let guess: string;
	let timerId: NodeJS.Timeout;

	$: console.log($settings.operations);

	function newGame() {
		state = 'ongoing';
		score = 0;
		nextChallenge();
	}

	function nextChallenge() {
		guess = '';
		challenge = generateChallenge($settings, score);
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			state = 'finished';
		}, 5000);
	}

	function submitAnswer() {
		console.log(guess, challenge.answer);
		if (parseFloat(guess) === challenge.answer) {
			score++;
			nextChallenge();
		} else {
			state = 'finished';
		}
	}
</script>

{#if state === 'idle'}
	<button on:click={newGame}>start</button>
{:else}
	<div>
		<h1>{challenge.question}</h1>
		<Input disabled={state !== 'ongoing'} bind:guess on:enter={submitAnswer} />
	</div>
{/if}

{#if state === 'finished'}
	<h1>Score: {score}</h1>
	<p>the correct answer was {challenge.answer}</p>
	<button on:click={newGame}>play again</button>
{/if}
