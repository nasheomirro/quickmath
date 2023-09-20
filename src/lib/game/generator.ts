import type { Challenge, SettingsType } from '../types';

export const generateChallenge = (settings: SettingsType, score: number): Challenge => {
	const operations = Array.from(settings.operations);
	const randomOperation = operations[Math.floor(Math.random() * operations.length)];

	switch (randomOperation) {
		case '+':
		case '-': {
			let min = Math.floor(2 + score * 1.5);
			let max = Math.floor(15 + score * 1.5);

			let n1 = Math.floor(Math.random() * max) + min;
			let n2 = Math.floor(Math.random() * max) + min;
			let question = `${n1} ${randomOperation} ${n2}`;
			let answer = Math.round(eval(question) as number);

			return { question, answer };
		}
		case '*': {
			let whole = 9 + Math.floor(score * 0.5);
			// the whole gets cut into two pieces
			const firstHalf = Math.floor(Math.random() * (whole - 3)) + 2;
			const secondHalf = whole - firstHalf;

			let question = `${firstHalf} * ${secondHalf}`;
			let answer = Math.round(eval(question) as number);

			console.log(whole, question, answer);

			return { question, answer };
		}
		case '/': {
			const multiplier = Math.floor(Math.random() * 2) % 2 === 0 ? 2 : 3;
			const max = 3 + Math.floor(score * 0.5);
			const min = 4 + Math.floor(score * 0.75);

			const n1 = (Math.floor(Math.random() * max) + min) * multiplier;
			let n2: number;

			// get a random factor of n1 that isn't 1 or itself
			const factors = [];
			for (let i = 2; i < n1; i++) {
				if (n1 % i === 0) factors.push(i);
			}

			if (factors.length) {
				n2 = factors[Math.floor(Math.random() * factors.length)];
			} else {
				// if for some reason we don't have a factor make it itself
				n2 = n1;
			}

			let question = `${n1} / ${n2}`;
			let answer = Math.round(eval(question) as number);

			return { question, answer };
		}
	}
};
