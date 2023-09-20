import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { useState } from "react";
import { ChangeEvent } from "react";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { waitUpdate } from "../../utils/utils";
import { ButtonsTypes } from "../../types/buttons";
import { DELAY_IN_MS } from "../../constants/delays";
import { TaskInput } from "../task-input/task-input";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [reversedInput, setReversedInput] = useState<
    { status: ElementStates; value: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sort = async () => {
    setLoading(true);
    for (
      let start = 0, end = reversedInput.length - 1;
      start <= end;
      start++, end--
    ) {
      await waitUpdate(DELAY_IN_MS);

      setReversedInput((prevState) => {
        return prevState.map((item, index) => {
          if (index === start) {
            return { ...item, status: ElementStates.Changing };
          } else if (index === end) {
            return { ...item, status: ElementStates.Changing };
          } else {
            return item;
          }
        });
      });
      await waitUpdate(DELAY_IN_MS);

      setReversedInput((prevState) => {
        let newState = [...prevState];
        if (newState[start] && newState[end]) {
          const temp = newState[start];
          newState[start] = newState[end];
          newState[end] = temp;
        }
        newState = newState.map((item, index) => {
          if (item.status === ElementStates.Changing) {
            return { ...item, status: ElementStates.Modified };
          } else {
            return item;
          }
        });
        return newState;
      });
    }
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
      onClick: sort,
      loader: loading,
      disabled: input === "",
    },
  ];

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
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