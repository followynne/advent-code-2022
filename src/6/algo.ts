import { onlyUnique } from '../util/filters.js';
import { inputData } from './input.js';

const firstQuestion = () => {
  const splitInput = inputData.split('');
  let result = 0;
  splitInput.forEach((_, i) => {
    if (result !== 0 || splitInput.length - (3 + i) < 0) return;
    const subset = [
      splitInput[i]!,
      splitInput[i + 1]!,
      splitInput[i + 2]!,
      splitInput[i + 3]!,
    ];

    if (subset.filter(onlyUnique).length === subset.length) {
      result = i + 4;
    }
    return;
  });
  return result;
};

/* -------------------------------------- */

const secondQuestion = () => {
  const splitInput = inputData.split('');
  let result = 0;
  splitInput.forEach((_, i) => {
    if (result !== 0 || splitInput.length - (13 + i) < 0) return;
    const subset = splitInput.filter(
      (_, internalI) => internalI >= i && internalI < i + 14,
    );
    if (i === 0) {
      console.log(subset);
    }
    if (subset.filter(onlyUnique).length === subset.length) {
      result = i + 14;
    }
    return;
  });
  return result;
};

export const Solution6 = {
  1: firstQuestion,
  2: secondQuestion,
};
