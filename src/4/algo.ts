import { inputData } from './input.js';

const firstQuestion = () => {
  let res = 0;
  for (let index = 0; index < inputData.length; index += 2) {
    const firstGroup = inputData[index]!
    const secondGroup = inputData[index + 1]!

    const isFirstInSecondRange = secondGroup[0]! >= firstGroup[0]! && secondGroup[1]! <= firstGroup[1]!
    const isSecondInFirstRange = firstGroup[0]! >= secondGroup[0]! && firstGroup[1]! <= secondGroup[1]!
    res += isFirstInSecondRange || isSecondInFirstRange ? 1 : 0
  }
  return res;
};

/* -------------------------------------- */

const secondQuestion = () => {
  let res = 0;
  for (let index = 0; index < inputData.length; index += 2) {
    const firstGroup = inputData[index]!
    const secondGroup = inputData[index + 1]!

    const isFirstInSecondRange = secondGroup[0]! <= firstGroup[1]! && secondGroup[1]! >= firstGroup[0]!
    const isSecondInFirstRange = firstGroup[0]! <= secondGroup[1]! && firstGroup[1]! >= secondGroup[0]!
    res += isFirstInSecondRange || isSecondInFirstRange ? 1 : 0
  }
  return res;
};

export const Solution4 = {
  1: firstQuestion,
  2: secondQuestion,
};
