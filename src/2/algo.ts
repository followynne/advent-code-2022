import { inputData } from '../2/input.js';

const win = 6;
const draw = 3;
const loss = 0;

const rock = { in: 'A', out: 'X' };
const paper = { in: 'B', out: 'Y' };
const scissors = { in: 'C', out: 'Z' };

const winningStrategy = [
  { step: rock, wins: scissors.in, point: 1 },
  { step: paper, wins: rock.in, point: 2 },
  { step: scissors, wins: paper.in, point: 3 },
];

const firstQuestion_PointsFromInput = () => {
  const gen = generatePoints([...inputData]);

  let result = 0;
  do {
    const next = gen.next();
    if (!next.value) return result;
    result = next.value;
  } while (true);
};

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
      yield (total += strategyItem!.point + loss);
    }
  } while (input.length);
  yield total;
}

/* -------------------------------------- */
const signs = [
  { sign: 'Z', val: win },
  { sign: 'Y', val: draw },
  { sign: 'X', val: loss },
];

const secondQuestion_PointsFromInput = () => {
  let result = 0;
  inputData.forEach((value) => {
    const gameResult = signs.find((p) => p.sign === value.output);
    if (gameResult?.sign === 'Y')
      result +=
        gameResult.val +
        winningStrategy.find((p) => p.step.in === value.entry)!.point;
    else if (gameResult?.sign === 'Z')
      result +=
        gameResult.val +
        winningStrategy.find((p) => p.wins === value.entry)!.point;
    else
      result +=
        gameResult!.val +
        winningStrategy.find(
          (p) => p.wins !== value.entry && p.step.in != value.entry,
        )!.point;
  });
  return result;
};

export const Solution2 = {
  1: firstQuestion_PointsFromInput,
  2: secondQuestion_PointsFromInput,
};
