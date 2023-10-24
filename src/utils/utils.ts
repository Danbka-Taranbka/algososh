import { DELAY_IN_MS } from "../constants/delays";
import { ElementStates } from "../types/element-states";

function getRandomNum(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const createRandomArr = (
  lenMin: number,
  lenMax: number,
  ValueMin: number,
  valueMax: number
) => {
  let randomNumsArr = Array.from(
    { length: getRandomNum(lenMin, lenMax) },
    () => getRandomNum(ValueMin, valueMax)
  );
  return randomNumsArr;
};

export const waitUpdate = (delay: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), delay);
  });
};

export const getFib = (num: number) => {
  const fibArr = [1, 1];
  const fibResult = [[1], [1, 1]];

  for (let i = 1; i < num; i++) {
    fibArr.push(fibArr[i - 1] + fibArr[i]);
    fibResult.push([...fibArr]);
  }

  return fibResult;
};

export const swap = (
  arr: { value: string | number, status: ElementStates }[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const reverse = async (
  reversedInput: { status: ElementStates, value: string }[],
  setReversedInput: React.Dispatch<React.SetStateAction<{ status: ElementStates, value: string }[]>>
  ) => {
  for (
    let start = 0, end = reversedInput.length - 1;
    start <= end;
    start++, end--
  ) {
    await waitUpdate(DELAY_IN_MS);

    reversedInput[start].status = ElementStates.Changing;
    reversedInput[end].status = ElementStates.Changing;
    setReversedInput([...reversedInput]);
    await waitUpdate(DELAY_IN_MS);
    swap(reversedInput, start, end);
    reversedInput[start].status = ElementStates.Modified;
    reversedInput[end].status = ElementStates.Modified;
    setReversedInput([...reversedInput]);
  }
  return reversedInput;
};