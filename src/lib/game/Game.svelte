<script lang="ts">
	import type { Challenge } from '$lib/types';
	import { tick } from 'svelte';
	import Input from './Input.svelte';
	import { generateChallenge } from './generator';
	import { settings, speedMap } from './settings';

	let score = 0;
	let state: 'idle' | 'ongoing' | 'finished' = 'idle';
	let challenge: Challenge;

  $: console.log($settings.speed);

	let guess: string;
	let timerId: NodeJS.Timeout;

	let input: Input;

	function newGame() {
		state = 'ongoing';
		score = 0;
		nextChallenge();
		tick().then(() => input.focus());
	}

	function nextChallenge() {
		guess = '';
		challenge = generateChallenge($settings, score);
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			state = 'finished';
		}, speedMap[$settings.speed]);
	}

	function submitAnswer() {
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
		<Input bind:this={input} disabled={state !== 'ongoing'} bind:guess on:enter={submitAnswer} />
	</div>
{/if}

{#if state === 'finished'}
	<h1>Score: {score}</h1>
	<p>the correct answer was {challenge.answer}</p>
	<button on:click={newGame}>play again</button>
{/if}
