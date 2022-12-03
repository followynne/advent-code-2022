import { Solution1 } from './1/algo.js';
import inquirer from 'inquirer';
import { Solution2 } from './2/algo.js';

export type Solution = {
  1: () => void;
  2: () => void;
};

console.log(Solution2[1]());

const availableDays: Record<string, Solution> = {
  '1': Solution1,
  '2': Solution2,
  ALL: { 1: () => {}, 2: () => {} },
};

type Days = keyof typeof availableDays;
inquirer
  .prompt([
    {
      type: 'list',
      choices: [
        ...Object.keys(availableDays),
        new inquirer.Separator(),
        'exit',
      ],
      loop: true,
      default: 'ALL',
      message: 'Select the advent-of-code day script to run or exit.',
      name: 'selectDay',
    },
  ])
  .then((answers) => {
    const res = answers['selectDay'] as Days;
    const parsedRes = Number.parseInt(res);
    if (Number.isInteger(parsedRes)) {
      console.log('help')
      const ui = new inquirer.ui.BottomBar();
      console.log(availableDays[parsedRes])
      ui.log.write(`${res}.1`);
      ui.log.write(availableDays[parsedRes]?.[1]());
      console.groupEnd();
      console.group(1.2);
      ui.log.write(`${res}.2`);
      ui.log.write(availableDays[parsedRes]?.[2]());
      console.groupEnd();
    } else res === 'ALL' ? 'OK' : process.exit();
    return;
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
