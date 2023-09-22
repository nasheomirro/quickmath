import { browser } from '$app/environment';
import type { SettingsType, SpeedCategory } from '$lib/types';
import { writable } from 'svelte/store';

export const SPEEDMAP: { [K in SpeedCategory]: number } = {
	classic: 6500,
	blitz: 4500,
	bullet: 2500
};

const STORAGE_KEY = 'settings';

const createSettingStore = () => {
	let initial: SettingsType = {
		operations: ['+', '-', '*'],
		speed: 'blitz'
	};

	if (browser) {
		let saved = localStorage.getItem(STORAGE_KEY);
		initial = saved ? JSON.parse(saved) : initial;
	}

	const store = writable<SettingsType>({
		operations: ['+', '-', '*'],
		speed: 'blitz'
	});

	if (browser) {
		store.subscribe((value) => {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
		});
	}

	return store;
};

export const settings = createSettingStore();
