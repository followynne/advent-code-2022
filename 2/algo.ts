import { inputData } from '../2/input.js';

const win = 6;
const draw = 3;
const lost = 0;

const rock = { in: 'A', out: 'X' };
const paper = { in: 'B', out: 'Y' };
const scissors = { in: 'C', out: 'Z' };

const winningStrategy = [
  { step: rock, wins: scissors.in, point: 1 },
  { step: paper, wins: rock.in, point: 2 },
  { step: scissors, wins: paper.in, point: 3 },
];

const firstQuestion_PointsFromInput = () => {
  const gen = generatePoints(inputData.slice(0, 5));
  let result = 0;
  do {
    const next = gen.next();
    console.log(next.value);
    debugger;
    if (!next.value) break;
    result = next.value;
  } while (true);

  return result;
  // inputData.reduce((prev, curr) => generatePoints(curr) + prev, 0);
};

function* generatePoints(input: { entry: string; output: string }[]) {
  let total = 0;
  for (const { entry, output } of input) {
    const strategyItem = winningStrategy.find((w) => output === w.step.out);
    console.log(entry, output);
    if (strategyItem?.step.in! === entry) {
      console.log('draw');
      yield (total += strategyItem!.point + draw);
    } else if (strategyItem?.wins === entry) {
      console.log('win');
      yield (total += strategyItem!.point + win);
    } else {
      console.log('lost');

      yield (total += strategyItem!.point + lost);
    }
  }
  return total;
}

export const Solution2 = () => {
  console.log(firstQuestion_PointsFromInput());
};
