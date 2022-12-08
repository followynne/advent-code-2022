#!/usr/bin/env node
import inquirer from 'inquirer';
import { readFile } from 'fs';
import { Solution1 } from './1/algo.js';
import { Solution2 } from './2/algo.js';
import { Solution3 } from './3/algo.js';
import { Solution4 } from './4/algo.js';
import { Solution5 } from './5/algo.js';

export type Solution = {
  1: (debug: boolean) => void;
  2: (debug: boolean) => void;
};

const availableDays: Record<string, Solution> = {
  '1': Solution1,
  '2': Solution2,
  '3': Solution3,
  '4': Solution4,
  '5': Solution5,
  ALL: { 1: () => {}, 2: () => {} },
};

type Days = keyof typeof availableDays;

const promptQuestion = () =>
  inquirer
    .prompt([
      {
        type: 'list',
        message:
          'Select the advent-of-code day to run or run the algo on your raw input! ' +
          'Solve my case: pass day and a file path to the raw input received from the website and wait for the solution;' +
          'Single-day contains debug and algorithm comments, ALL will print out all the results I got.',
        name: 'selectDay',
        choices: [
          ...Object.keys(availableDays),
          new inquirer.Separator(),
          'solve my case',
          'exit',
        ],
        loop: false,
        default: Object.keys(availableDays)
          .filter((p) => Number.isInteger(Number.parseInt(p)))
          .sort()
          .at(-1),
      },
      {
        name: 'Solve my case',
        type: 'number',
        message: 'solve the day!',
        when: (answers) => answers['selectDay'] === 'solve my case',
      },
      {
        name: 'Solve my case 2',
        type: 'input',
        choices: [
          {
            key: 'file-path',
            name: 'File path of the input file, saved as .txt',
          },
        ],
        when: (answers) => answers['selectDay'] === 'solve my case',
      },
    ])
    .then((answers) => {
      console.log('here', answers);
      const ui = new inquirer.ui.BottomBar();
      const res = answers['selectDay'] as Days;
      const parsedRes = Number.parseInt(res);
      if (Number.isInteger(parsedRes)) {
        printDayResult(ui, parsedRes, true);
        return true;
      }
      if (res === 'ALL') {
        Object.keys(availableDays)
          .filter((l) => l !== 'ALL')
          .forEach((element) => {
            printDayResult(ui, Number.parseInt(element));
          });
        return true;
      }
      if (res === 'solve my case') {
        const file = readFile('path/to', (err) => err);
      }

      return false;
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });

const printDayResult = (
  ui: inquirer.ui.BottomBar,
  parsedRes: number,
  debug = false,
) => {
  ui.log.write(`---------- ${parsedRes}.1 -------`);
  ui.log.write(
    `${JSON.stringify(availableDays[parsedRes]?.[1](debug), null, 1)}`,
  );
  ui.log.write(`---------- ${parsedRes}.2 --------`);
  ui.log.write(
    `${JSON.stringify(availableDays[parsedRes]?.[2](debug), null, 1)}`,
  );
  ui.log.write(new inquirer.Separator());
};

do {
  const res = await promptQuestion();
  if (!res) break;
} while (true);

process.exit(0);
