import { inputData } from '../3/input.js';

const firstQuestion = () => {
  let result = 0;
  inputData.forEach((input) => {
    const [firsthalf, secondHalf] = [
      input.slice(0, input.length / 2),
      input.slice(input.length / 2, input.length),
    ];
    const findItem =
      secondHalf.split('').find((p) => firsthalf.includes(p)) ||
      firsthalf.split('').find((p) => secondHalf.includes(p)) ||
      secondHalf.at(0);

    result += calcCharWeight(findItem!);
  });
  return result;
};

const calcCharWeight = (char?: string) => {
  if (!char) {
    console.log(char);
    throw new Error('Fuck!');
  }
  const multiply = char.charCodeAt(0) < 97;
  return char.toLowerCase().charCodeAt(0) - 96 + (multiply ? 26 : 0);
};

/* -------------------------------------- */

const secondQuestion = () => {
  const data = [...inputData];
  let result = 0;
  do {
    const firstItems = data.splice(0, 3);
    const uniques = firstItems.join('').split('').filter(onlyUnique);
    result += calcCharWeight(
      uniques.find((p) => firstItems.every((s) => s.includes(p))),
    );
  } while (data.length);
  return result;
};

function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index;
}

export const Solution3 = {
  1: firstQuestion,
  2: secondQuestion,
};
