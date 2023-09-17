<script lang="ts">
	import { generateQuestion } from '$lib/generator';
	import type { Question } from '$lib/types';
	import { getSettingStore } from '../settings';

	const settings = getSettingStore();

	let state: 'idle' | 'ongoing' | 'finished' = 'idle';
	let score = 0;
	let question: Question;

	let userGuess = '';

	function startGame() {
		state = 'ongoing';
		score = 0;
		nextQuestion();
	}

	function nextQuestion() {
		userGuess = '';
		question = generateQuestion($settings);
	}

	function guessQuestion() {
		const [, answer] = question;
		if (parseFloat(userGuess) === answer) {
			score++;
			nextQuestion();
		} else {
			state = 'finished';
		}
	}
</script>

{#if state === 'idle'}
	<button on:click={startGame}>start</button>
{:else}
	<div>
		<h1>{question[0]}</h1>
		<p>answer: {question[1]}</p>
		<input
			disabled={state !== 'ongoing'}
			bind:value={userGuess}
			on:keydown={(e) => {
				if (e.key === 'Enter') guessQuestion();
			}}
		/>
	</div>
	{#if state === 'finished'}
		<h1>Score: {score}</h1>
		<button on:click={startGame}>new game</button>
	{/if}
{/if}
