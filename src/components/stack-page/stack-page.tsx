import React, { useRef, useState, MouseEvent } from "react";
import styles from "./stack-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { TaskInput } from "../task-input/task-input";

import { useForm } from "../../hooks/useForm";

import { ElementStates } from "../../types/element-states";
import { ButtonsTypes } from "../../types/buttons";
import { Stack } from "./stack";

import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [loading, setLoading] = useState<string>("");
  const { values, handleChange, setValues } = useForm<{ input: string }>({
    input: "",
  });

  const stackRef = useRef(new Stack<string>());
  const [stack, setStack] = useState<string[]>([]);
  const [isLastChanging, setChanging] =
    useState<Boolean>(false);

  const onAdd = (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(e.currentTarget.innerText);
    stackRef.current.push(values.input);
    setChanging(true);
    setStack([...stackRef.current.elements]);
    setTimeout(() => {
      setChanging(false);
      setLoading("");
      setValues({ input: "" });
    }, SHORT_DELAY_IN_MS);
  };

  const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(e.currentTarget.innerText);
    setChanging(true);
    setTimeout(() => {
      stackRef.current.pop();
      setStack([...stackRef.current.elements]);
      setChanging(false);
      setLoading("");
      setValues({ input: "" });
    }, SHORT_DELAY_IN_MS);
  };

  const onReset = () => {
    stackRef.current.clear();
    setStack(stackRef.current.elements);
  };

  const buttons = [
    {
      text: ButtonsTypes.Add,
      onClick: onAdd,
      loader: loading === ButtonsTypes.Add,
      disabled: values.input === "" || loading !== "",
    },
    {
      text: ButtonsTypes.Delete,
      onClick: onDelete,
      loader: loading === ButtonsTypes.Delete,
      disabled: loading !== "" || stack.length === 0,
    },
  ];

  return (
    <SolutionLayout title="Стек">
      <div className={styles.menu} data-testid="stack-page">
        <TaskInput
          value={values.input}
          onInput={handleChange}
          name="input"
          buttons={buttons}
          isLimitText={true}
          maxLength={4}
        />
        <Button
          text={ButtonsTypes.Reset}
          disabled={loading !== "" || stack.length === 0}
          onClick={onReset}
        />
      </div>
      <div className={styles.display}>
        <ul className={styles.list}>
          {stack &&
            stack.map((number, i) => {
              return (
                <li key={i}>
                  <Circle
                    head={i === stackRef.current.peek ? "top" : null}
                    letter={`${number}`}
                    tail={`${i}`}
                    state={
                      isLastChanging &&
                      i === stackRef.current.peek
                        ? ElementStates.Changing
                        : ElementStates.Default
                    }
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </SolutionLayout>
  );
};