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