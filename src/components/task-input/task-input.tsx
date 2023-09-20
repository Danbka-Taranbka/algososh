import React from "react";
import { Input, InputProps } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./task-input.module.css";
import { MouseEvent } from "react";

interface ITaskInputProps extends InputProps {
  buttons: {
    text: string;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    loader?: boolean | undefined;
    disabled?: boolean | undefined;
    linkedListDown?: boolean | undefined;
  }[];
}

export const TaskInput: React.FC<ITaskInputProps> = ({
  buttons,
  ...rest
}) => {
  return (
    <div className={styles.container}>
      <Input {...rest} extraClass={styles.input} />
      {buttons &&
        buttons.map((button, i) => {
          return (
            <Button
              isLoader={button.loader}
              disabled={button.disabled}
              key={i}
              text={button.text}
              onClick={button.onClick}
              linkedList={button.linkedListDown ? "big" : "small"}
            />
          );
        })}
    </div>
  );
};