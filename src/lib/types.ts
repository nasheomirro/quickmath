export type SpeedCategory = 'classic' | 'blitz' | 'bullet';

export type SettingsType = {
	operations: Array<'+' | '-' | '*' | '/'>;
	speed: SpeedCategory;
};

export type Challenge = {
	question: string;
	answer: number;
};
