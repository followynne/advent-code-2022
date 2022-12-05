import { inputData, naturalLanguageMovements } from './input.js';

const firstQuestion = () => {
  const data = { ...inputData };
  naturalLanguageMovements.forEach((movement) => {
    const { pop, fromColumn: from, toColumn: to } = getMovements(movement);
    const popItems = data[from]!.splice(-pop).reverse();
    data[to]!.push(...popItems);
  });

  const result = Object.keys(data)
    .flatMap((p) => data[p as keyof typeof inputData].slice(-1))
    .join('');
  const stacks = Object.keys(data).map((p) =>
    data[p as keyof typeof inputData].join(''),
  );
  return { stacks_1_to_9: stacks, result };
};

/* -------------------------------------- */

const secondQuestion = () => {
  return Number.NaN + naturalLanguageMovements.length;
};

export const Solution5 = {
  1: firstQuestion,
  2: secondQuestion,
};

const getMovements = (movement: string) => {
  const getMoves = movement
    .split(' ')
    .filter((p) => Number.isInteger(Number.parseInt(p)))
    .map((p) => Number.parseInt(p));

  return {
    pop: getMoves[0]!,
    fromColumn: getMoves[1]!.toString() as keyof typeof inputData,
    toColumn: getMoves[2]!.toString() as keyof typeof inputData,
  };
};
