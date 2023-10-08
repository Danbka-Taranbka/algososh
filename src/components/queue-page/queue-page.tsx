import React, { useRef, useState, useEffect, MouseEvent } from "react";

import styles from "./queue-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { TaskInput } from "../task-input/task-input";

import { ElementStates } from "../../types/element-states";
import { ButtonsTypes } from "../../types/buttons";

import { useForm } from "../../hooks/useForm";

import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";

import { Queue } from "./queue";

export const QueuePage: React.FC = () => {
  const [loading, setLoading] = useState<string>("");
  const { values, handleChange, setValues } = useForm<{ input: string }>({
    input: "",
  });
  const [isHeadChanging, setHeadChanging] = useState<Boolean>(false);
  const [isTailChanging, setTailChanging] = useState<Boolean>(false);

  const queueRef = useRef(new Queue<string>(7));
  const [queue, setQueue] = useState<(string | null)[]>([]);

  useEffect(() => {
    setQueue(queueRef.current.elements);
  }, []);

  const onAdd = (e: MouseEvent<HTMLButtonElement>) => {
    setTailChanging(true);
    setLoading(e.currentTarget.innerText);

    setTimeout(() => {
      queueRef.current.enqueue(values.input);
      setQueue(queueRef.current.elements);
      setTailChanging(false);
      setLoading("");
    }, SHORT_DELAY_IN_MS);
    setValues({ input: "" });
  };

  const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
    if (!queueRef.current.isEmpty) {
      setHeadChanging(true);
      setLoading(e.currentTarget.innerText);

      setTimeout(() => {
        queueRef.current.dequeue();
        setQueue(queueRef.current.elements);
        setHeadChanging(false);
        setLoading("");
      }, SHORT_DELAY_IN_MS);
      setValues({ input: "" });
    }
  };

  const onReset = () => {
    queueRef.current.clear();
    setQueue(queueRef.current.elements);
  };

  const buttons = [
    {
      text: ButtonsTypes.Add,
      onClick: onAdd,
      loader: loading === ButtonsTypes.Add,
      disabled: loading !== "" || values.input === "",
    },
    {
      text: ButtonsTypes.Delete,
      onClick: onDelete,
      loader: loading === ButtonsTypes.Delete,
      disabled: loading !== "" || queueRef.current.isEmpty,
    },
  ];

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.menu} data-testid="queue-page">
        <TaskInput
          value={values.input}
          name="input"
          onInput={handleChange}
          buttons={buttons}
          isLimitText={true}
          maxLength={4}
        />
        <Button
          text={ButtonsTypes.Reset}
          disabled={loading !== "" || queueRef.current.isEmpty}
          onClick={onReset}
        />
      </div>
      <div className={styles.display}>
        <ul className={styles.list}>
          {queue &&
            queue.map((letter, i) => {
              return (
                <li key={i}>
                  <Circle
                    head={
                      i === queueRef.current.getHead &&
                      queue[queueRef.current.getHead] !== undefined
                        ? HEAD
                        : null
                    }
                    letter={letter ? letter : ""}
                    index={i}
                    tail={
                      i === queueRef.current.getTail - 1 &&
                      queue[queueRef.current.getTail - 1] !== null
                        ? TAIL
                        : null
                    }
                    state={
                      (isTailChanging && i === queueRef.current.getTail) ||
                      (isHeadChanging && i === queueRef.current.getHead)
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