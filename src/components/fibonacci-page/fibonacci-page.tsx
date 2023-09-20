import React from "react";
import { useState, useCallback } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { TaskInput } from "../task-input/task-input";
import { getFib } from "../../utils/utils";
import { ButtonsTypes } from "../../types/buttons";
import { useForm } from "../../hooks/useForm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fib, setFib] = useState<number[]>([]);
  const { values, handleChange } = useForm<{ input: string }>({
    input: "",
  });

  const onDisplay = useCallback(() => {
    const fibResult = getFib(+values.input);
    setLoading(true);

    let i = 0;
    const timerId = setInterval(() => {
      if (i < fibResult.length) {
        setFib(fibResult[i]);
        i++;
      } else {
        clearInterval(timerId);
        setLoading(false);
      }
    }, SHORT_DELAY_IN_MS);
  }, [values]);

  const buttons = [
    {
      text: ButtonsTypes.Count,
      onClick: onDisplay,
      loader: loading,
      disabled:
        values.input === "" ||
        Number(values) >= 20 ||
        Number(values) < 1 ||
        Number(values.input) > 19 ||
        Number(values.input) < 0,
    },
  ];

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <TaskInput
          onInput={handleChange}
          isLimitText
          type="number"
          max={19}
          name="input"
          value={values.input}
          buttons={buttons}
        />
        <div className={styles.display}>
          <ul className={styles.list}>
            {fib &&
              fib.map((number, i) => {
                return (
                  <li key={i} className={styles.list__item}>
                    <Circle letter={number.toString()} tail={`${i}`} />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </SolutionLayout>
  );
};