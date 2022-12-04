#!/usr/bin/env node
import inquirer from 'inquirer';
import { Solution1 } from './1/algo.js';
import { Solution2 } from './2/algo.js';
import { Solution3 } from './3/algo.js';
import { Solution4 } from './4/algo.js';
import { Solution5 } from './5/algo.js';

export type Solution = {
  1: () => void;
  2: () => void;
};

const availableDays: Record<string, Solution> = {
  '1': Solution1,
  '2': Solution2,
  '3': Solution3,
  '4': Solution4,
  '5': Solution5,
  ALL: { 1: () => { }, 2: () => { } },
};

type Days = keyof typeof availableDays;

const promptQuestion = () => inquirer
  .prompt([
    {
      type: 'list',
      message: 'Select the advent-of-code day to run! Single-day contains debug and algorithm comments, ALL will print out all the results',
      name: 'selectDay',
      choices: [
        ...Object.keys(availableDays),
        new inquirer.Separator(),
        'exit',
      ],
      loop: false,
      default: Object.keys(availableDays).filter(p => Number.isInteger(Number.parseInt(p))).sort().at(-1),
    },
  ])
  .then((answers) => {
    const ui = new inquirer.ui.BottomBar();
    const res = answers['selectDay'] as Days;
    const parsedRes = Number.parseInt(res);
    if (Number.isInteger(parsedRes)) {
      printDayResult(ui, parsedRes);
      return true;
    }
    if (res === 'ALL') {
      Object.keys(availableDays).filter(l => l !== 'ALL').forEach(element => {
        printDayResult(ui, Number.parseInt(element))
      });
      return true
    }
    return false
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

const printDayResult = (ui: inquirer.ui.BottomBar, parsedRes: number) => {
  ui.log.write(`---------- ${parsedRes}.1 -------`);
  ui.log.write(`${JSON.stringify(availableDays[parsedRes]?.[1](), null, 1)}`);
  ui.log.write(`---------- ${parsedRes}.2 --------`);
  ui.log.write(`${JSON.stringify(availableDays[parsedRes]?.[2](), null, 1)}`);
  ui.log.write(new inquirer.Separator)
}

do {
  const res = await promptQuestion();
  if (!res) break;
} while (true)

process.exit(0);
