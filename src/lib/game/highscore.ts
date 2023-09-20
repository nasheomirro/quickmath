import { browser } from '$app/environment';
import type { SpeedCategory } from '$lib/types';
import { get, writable } from 'svelte/store';

type HighScoreStore = {
	[K in SpeedCategory]: number;
};

const HIGHSCORE_KEY = 'highscore';

const createHighScoreStore = () => {
	let initial = {
		classic: 0,
		blitz: 0,
		bullet: 0
	};

	if (browser) {
		let saved = localStorage.getItem(HIGHSCORE_KEY);
		initial = saved ? JSON.parse(saved) : initial;
	}

	const store = writable<HighScoreStore>(initial);
	store.subscribe((value) => {
		localStorage.setItem(HIGHSCORE_KEY, JSON.stringify(value));
	});

	const reviewScore = (type: SpeedCategory, score: number) => {
		const currentHigh = get(store)[type];
		if (score > currentHigh) {
			store.update((store) => ({ ...store, [type]: score }));
			return true;
		}
		return false;
	};

	return { subscribe: store.subscribe, reviewScore };
};

export const highscore = createHighScoreStore();
