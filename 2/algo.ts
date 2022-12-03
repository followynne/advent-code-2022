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
  const gen = generatePoints(inputData);

  let result = 0;
  do {
    const next = gen.next();
    if (!next.value) return result;
    result = next.value;
  } while (true);
};
const secondQuestion_PointsFromInput = () => {};

function* generatePoints(input: { entry: string; output: string }[]) {
  let total = 0;
  do {
    const obj = input.pop();
    const strategyItem = winningStrategy.find(
      (w) => obj!.output === w.step.out,
    );
    if (strategyItem?.step.in! === obj!.entry) {
      yield (total += strategyItem!.point + draw);
    } else if (strategyItem?.wins === obj!.entry) {
      yield (total += strategyItem!.point + win);
    } else {
      yield (total += strategyItem!.point + lost);
    }
  } while (input.length);
  yield total;
}

export const Solution2 = {
  1: firstQuestion_PointsFromInput,
  2: secondQuestion_PointsFromInput,
};
