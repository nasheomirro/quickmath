import type { Settings } from "$lib/types";
import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";

type SettingStore = Writable<Settings>;

export const createSettingStore = (): SettingStore => {
  const settingStore = writable<Settings>({
    operations: ["+", "-"],
    speed: "easy"
  });
  return settingStore;
}

const settingsKey = Symbol();
export const getSettingStore = () => getContext(settingsKey) as SettingStore;
export const setSettingStore = (store: SettingStore) => setContext(settingsKey, store);