import { onlyUnique } from '../util/filters.js';
import { inputData } from './input.js';

const firstQuestion = () => commonSolution(4);

const secondQuestion = () => commonSolution(14);

/* -------------------------------------- */
const commonSolution = (uniqueItemsToConsider: number) => {
  const splitInput = inputData.split('');
  let result = 0;
  splitInput.forEach((_, i) => {
    if (result === 0 && splitInput.length - (uniqueItemsToConsider + i) > -1) {
      const subset = splitInput.filter(
        (_, internalI) =>
          internalI >= i && internalI < i + uniqueItemsToConsider,
      );

      if (subset.filter(onlyUnique).length === subset.length) {
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
