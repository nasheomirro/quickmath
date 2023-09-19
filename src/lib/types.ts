export type SettingsType = {
	operations: Array<'+' | '-' | '*' | '/'>;
	speed: 'classic' | 'blitz' | 'bullet';
};

export type Challenge = {
  question: string;
  answer: number;
}
