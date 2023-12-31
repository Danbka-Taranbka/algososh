import React from "react";
import { useState, ChangeEvent } from "react";
import styles from "./string.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { ButtonsTypes } from "../../types/buttons";

import { reverse } from "../../utils/utils";

import { TaskInput } from "../task-input/task-input";


export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [reversedInput, setReversedInput] = useState<
    { status: ElementStates, value: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSort = async () => {
    setLoading(true);
    reverse(reversedInput, setReversedInput);
    setLoading(false);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    const modifiedArray = event.target.value.split("").map((letter) => {
      return { value: letter, status: ElementStates.Default };
    });
    setReversedInput(modifiedArray);
  };

  const buttons = [
    {
      text: ButtonsTypes.Reverse,
      onClick: onSort,
      loader: loading,
      disabled: input === "",
    },
  ];

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container} data-testid="recursion-page">
        <TaskInput
          value={input}
          name="input"
          onInput={onChange}
          buttons={buttons}
          isLimitText={true}
          maxLength={11}
        />
        <div className={styles.display}>
          <ul className={styles.list}>
            {reversedInput &&
             reversedInput.map((item, i) => {
                return (
                  <li key={i} className={styles.list__item}>
                    <Circle letter={item.value} state={item.status} />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </SolutionLayout>
  );
};