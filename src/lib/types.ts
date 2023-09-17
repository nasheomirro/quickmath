export type Settings = {
	operations: Array<'+' | '-' | '*' | '/'>;
	speed: 'easy' | 'blitz' | 'bullet';
};

export type Question = [string, number];