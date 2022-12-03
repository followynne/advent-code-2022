import { Solution1 } from './1/algo.js';
import inquirer from 'inquirer';

const availableDays = { '1': () => Solution1(), '2': () => Solution1(), 'ALL': () => {} } as const;
type Days = keyof typeof availableDays;

console.log(Solution1())

inquirer
  .prompt([
    {
      type: 'list',
      choices: [
        ...Object.keys(availableDays),
        'ALL',
        new inquirer.Separator(),
        'exit',
      ],
      loop: true,
      default: 'ALL',
      message: 'Select the advent-of-code day script to run or exit.',
      name: 'selectDay',
    },
    /* Pass your questions in here */
  ])
  .then((answers) => {
    const res = answers['selectDay'] as Days;
    if (Number.isInteger(res)) {
      const ui = new inquirer.ui.BottomBar();
      ui.log.write(availableDays[res]());
      console.log(availableDays[res]());
    } else
    (res === 'ALL') ? 'OK' : process.exit()

    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
