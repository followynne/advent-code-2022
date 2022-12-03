import inquirer from 'inquirer';
import { inputData } from './input.js';

const firstQuestion_mostCaloriesElf = () => {
  let indexElf = 0;
  let countElfCalories = 0;
  inputData.forEach((value, index) => {
    const caloriesCount = reduceCaloriesToSum(value);
    if (caloriesCount > countElfCalories) {
      indexElf = index;
      countElfCalories = caloriesCount;
    }
  });
  return { indexElf, countElfCalories };
};

const secondQuestion_3mostCaloriesElves = () => {
  const caloriesCount = inputData.flatMap((data) => reduceCaloriesToSum(data));
  const top = caloriesCount.sort((a, b) => b - a).slice(0, 3);
  return { topThree: top, total: reduceCaloriesToSum(top) };
};

const reduceCaloriesToSum = (inputArray: number[]) =>
  inputArray.reduce((prev, curr) => prev + curr, 0);

export const Solution1 = () => {
    const ui = new inquirer.ui.BottomBar();

  ui.log.write(1.1);
  ui.log.write(firstQuestion_mostCaloriesElf());
  console.groupEnd();
  console.group(1.2);
  console.log(secondQuestion_3mostCaloriesElves());
  console.groupEnd();
};
