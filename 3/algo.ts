import { inputData } from '../3/input.js';

const firstQuestion = () => {
  let result = 0;
  inputData.forEach((input) => {
    const [firsthalf, secondHalf] = [
      input.slice(0, (input.length) / 2),
      input.slice((input.length) / 2, input.length),
    ];
    const findItem =
      secondHalf.split('').find((p) => firsthalf.includes(p)) ||
      firsthalf.split('').find((p) => secondHalf.includes(p)) ||
      secondHalf.at(0);

    const multiply = findItem!.charCodeAt(0) < 97;

    result += findItem!.toLowerCase().charCodeAt(0) - 96 + (multiply ? 26 : 0);
  });
  return result;
};

/* -------------------------------------- */

const secondQuestion = () => {};

export const Solution3 = {
  1: firstQuestion,
  2: secondQuestion,
};
