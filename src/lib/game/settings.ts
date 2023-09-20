import { browser } from '$app/environment';
import type { SettingsType } from '$lib/types';
import { writable } from 'svelte/store';

export const speedMap: { [K in SettingsType['speed']]: number } = {
	classic: 6500,
	blitz: 4500,
	bullet: 2500
};

export const settings = writable<SettingsType>({
	operations: ['+', '-', '*'],
	speed: 'blitz'
});

if (browser) {
	// load from local storage
}
