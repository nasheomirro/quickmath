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
      let whole = Math.floor(9 + score * 0.5);
      // the whole gets cut into two pieces
      // 1 < piece < whole
      const firstHalf = Math.floor(Math.random() * (whole - 3)) + 2;
      const secondHalf = whole - firstHalf;
      
      
      let question = `${firstHalf} * ${secondHalf}`;
      let answer = Math.round(eval(question) as number);
      
      console.log(whole, question, answer);
      
      return { question, answer };
		}
		case '/': {
			// TODO: make division fun somehow
			let upperMax = 6 + score * 0.3;
			let lowerMax = 6 + score * 0.2;

			let n1 = Math.floor(Math.random() * upperMax) + 2;
			let n2 = Math.floor(Math.random() * lowerMax) + 2;
			let question = `${n1} ${randomOperation} ${n2}`;
			let answer = Math.round(eval(question) as number);

			return { question, answer };
		}
	}
};
