import type { Question, Settings } from "./types";

// based on the settings, create a question that fits it
export const generateQuestion = (settings: Settings): Question => {
  const operations = Array.from(settings.operations);
  const randomOperation = operations[Math.floor(Math.random() * operations.length)];

  let n1 = Math.floor(Math.random() * 99) + 1;
  let n2 = Math.floor(Math.random() * 99) + 1;

  const questionString = `${n1} ${randomOperation} ${n2}`;
  const answer = eval(questionString) as number;
  return [questionString, answer];
}
