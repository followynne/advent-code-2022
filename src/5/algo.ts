import { info, log } from '../util/debugUtil.js';
import { inputData, naturalLanguageMovements } from './input.js';

// LIFO: last-in, first-out
const firstQuestion = (debug = false) => getSolution(true, debug);

const secondQuestion = (hideDebug = false) => getSolution(false, hideDebug);

export const Solution5 = {
  1: firstQuestion,
  2: secondQuestion,
};

/* -------------------------------------- */
const getSolution = (reverse: boolean, debug: boolean) => {
  info(debug, `We have some stacks, each behaves as a *queue*`,
    'In this solution, the entry is an object; its properties are "1" to "9" (corresponding to the crane stacks) and each key-value is an array with the items of the stack.',
    'Ex: {1: ["B", "C", "G"], 2: [...], ...}',
    "Input will be a list of phrases, each composed as follows: 'move {X} from {Y} to {Z}', with X Y Z integers")

  const data = { ...inputData };
  log(debug, 'warn', '----------------', "First of all, we'll iterate crane movements and each time move the stacks =>");
  naturalLanguageMovements.forEach((movement, i) => {
    info(debug && i === 0, '1) we parse a movements string:');
    const {
      pop,
      fromColumn: from,
      toColumn: to,
    } = getMovements(movement, debug && i === 0);

    info(
      debug && i === 0,
      '2) We can modify the stacks. First, we pop from the //from-stack the requested items, obtainining an array with the removed items. Items are removed starting from [n-{popValue}] index to [n], with {n} the last index',
    );
    const popItems = data[from]!.splice(-pop);

    if (reverse) {
      info(
        debug && i === 0,
        'We reverse the array items, to be able to push from last to first item extracted.',
      );
      popItems.reverse();
    }

    info(
      debug && i === 0,
      'We push the extracted array to the end of the //to queue and restart the loop.',
    );
    data[to]!.push(...popItems);
  });

  log(
    debug, 'error',
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

const getMovements = (movement: string, debug: boolean) => {
  info(
    debug,
    'we split it by empty space, filter & keep the items that can be parsed to Integer.',
  );

  const getMoves = movement
    .split(' ')
    .filter((p) => Number.isInteger(Number.parseInt(p)))
    .map((p) => Number.parseInt(p));

  log(debug, 'warn', 'EX: move 1 from 7 to 4 => ["move", "1", "from", "7", "to", "4"] => [1, 7, 4]')
  info(
    debug,
    'First will be the *number of items to pop*, 2nd will be *from which column*, 3rd *to which col*',
  );
  return {
    pop: getMoves[0]!,
    fromColumn: getMoves[1]!.toString() as keyof typeof inputData,
    toColumn: getMoves[2]!.toString() as keyof typeof inputData,
  };
};