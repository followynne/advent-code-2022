import { info } from '../util/debugUtil.js';
import { onlyUnique } from '../util/filters.js';
import { inputData } from './input.js';

const firstQuestion = (debug: boolean) => commonSolution(debug, 4);

const secondQuestion = (debug: boolean) => commonSolution(debug, 14);

/* -------------------------------------- */
const commonSolution = (debug: boolean, uniqueItemsToConsider: number) => {
  info(
    debug,
    `we run the algorithm with input: ${uniqueItemsToConsider} n, amount of unique markers without repetition`,
    'we split the input string and iterate on each letter.',
  );
  const splitInput = inputData.split('');
  let result = 0;
  splitInput.forEach((_, i) => {
    if (result === 0 && splitInput.length - (uniqueItemsToConsider + i) > -1) {
      info(
        debug && i === 0,
        'on each iteration,',
        `we take the items of the split array, from current iteration index until item at position {index + ${uniqueItemsToConsider}},`,
      );
      const subset = splitInput.filter(
        (_, internalI) =>
          internalI >= i && internalI < i + uniqueItemsToConsider,
      );

      info(
        debug && i === 0,
        "we then check if there's any letter from the selected subset that repeats itself in it.",
      );

      if (subset.filter(onlyUnique).length === subset.length) {
        info(
          debug && i === 0,
          `if we don\'t find any dupe, we take as final result {index è ${uniqueItemsToConsider}} (which is the first marker that lets us obtain an unique subset.)`,
          ''
        );
        result = i + uniqueItemsToConsider;
      }
    }
  });
  return result;
};

export const Solution6 = {
  1: firstQuestion,
  2: secondQuestion,
  3: commonSolution,
};
