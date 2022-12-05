import { inputData, naturalLanguageMovements } from './input.js';

const firstQuestion = (hideDebug = true) => getSolution(true, hideDebug);

/* -------------------------------------- */

const secondQuestion = (hideDebug = true) => getSolution(false, hideDebug);

export const Solution5 = {
  1: firstQuestion,
  2: secondQuestion,
};

const getMovements = (movement: string, hideDebug: boolean) => {
  console.assert(
    !hideDebug,
    'split each move string by empty space, filter &map the items that can be parsed to Integer',
  );
  
  const getMoves = movement
  .split(' ')
  .filter((p) => Number.isInteger(Number.parseInt(p)))
  .map((p) => Number.parseInt(p));
  
  console.assert(!hideDebug, 'EX: move 1 from 7 to 4 => ["move", "1", "from", "7", "to", "4"] => [1, 7, 4]')
  console.assert(
    !hideDebug,
    'first will be the number of items to pop, 2nd will be from which column, 3rd to which col',
  );
  return {
    pop: getMoves[0]!,
    fromColumn: getMoves[1]!.toString() as keyof typeof inputData,
    toColumn: getMoves[2]!.toString() as keyof typeof inputData,
  };
};

const getSolution = (reverse: boolean, hideDebug: boolean) => {
  console.assert(!hideDebug, `We have some stacks, each behaves as a queue`);
  
  console.assert(
    !hideDebug,
    'In this solution, the entry is an object; properties keys goes 1 to 9 (corresponding to the crane stacks), each key-value is an array with the items of the stack',
    );
    console.assert(!hideDebug, 'EX: {1: ["B", "C", "G"]}')
  const data = { ...inputData };
  console.assert(!hideDebug, "let's iterate crane movements...");
  naturalLanguageMovements.forEach((movement, i) => {
    console.assert(!hideDebug || i !== 0, 'Parse the movements string:');
    const {
      pop,
      fromColumn: from,
      toColumn: to,
    } = getMovements(movement, hideDebug && i === 0);

    const popItems = data[from]!.splice(-pop);
    console.assert(
      !hideDebug || i !== 0,
      'Now we can modify the stacks. First we pop from the from-stack the items and obtain an array with the removed items. Items are removed starting from [n-{popValue}] index to [n], with {n} the last index',
    );
    if (reverse) {
      console.assert(
        !hideDebug || i !== 0,
        'We reverse the array items, to be able to push from last to first extracted.',
      );
      popItems.reverse();
    }
    console.assert(
      !hideDebug || i !== 0,
      'Push the array to the end of the queue.',
    );
    data[to]!.push(...popItems);
  });

  console.assert(
    !hideDebug,
    'END: we can get the last item of each stack and get the result!',
  );

  const result = Object.keys(data)
    .flatMap((p) => data[p as keyof typeof inputData].slice(-1))
    .join('');
  const stacks = Object.keys(data).map((p) =>
    data[p as keyof typeof inputData].join(''),
  );
  return { stacks_1_to_9: stacks, result };
};
