import { browser } from '$app/environment';
import type { SettingsType } from '$lib/types';
import { writable } from 'svelte/store';

export const settings = writable<SettingsType>({
	operations: ['+', '-', '*'],
	speed: 'blitz'
});

if (browser) {
	// load from local storage
}
