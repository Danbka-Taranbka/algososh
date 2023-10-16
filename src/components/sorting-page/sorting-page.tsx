import React from "react";
import { useState, useEffect } from "react";
import { MouseEvent } from "react";
import styles from "./sorting-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";

import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

import { createRandomArr, waitUpdate, swap } from "../../utils/utils";

import { DELAY_IN_MS } from "../../constants/delays";
import { sortSelection } from "./sort-selection";

export const SortingPage: React.FC = () => {
  const [filter, setFilter] =
    useState<string>("selectionSort");
  const [arr, setArr] = useState<{ value: number, status: ElementStates }[]>(
    []
  );
  const [loading, setLoading] = useState<string>("");

  useEffect(() => {
    changeRandom();
  }, []);

  const changeRandom = () => {
    const randomArray = createRandomArr(3, 18, 0, 101).map((item) => {
      return { value: item, status: ElementStates.Default };
    });
    setArr(randomArray);
  };

  const changeFilter = (
    event: MouseEvent<HTMLInputElement>
  ) => {
    setFilter(event.currentTarget.value);
  };

  const changeSortingDirection = (event: MouseEvent<HTMLButtonElement>) => {
    setLoading(event.currentTarget.innerText);
    if (filter === "selectionSort") {
      sortSelection(setArr, setLoading, arr, event.currentTarget.value);
    } else {
      sortBubble(event.currentTarget.value);
    }
  };

  const sortBubble = async (sortinDirection: string) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        await waitUpdate(DELAY_IN_MS);

        setArr((prevState) => {
          if (
            (sortinDirection === Direction.Ascending &&
              prevState[j].value > prevState[j + 1].value) ||
            (sortinDirection === Direction.Descending &&
              prevState[j].value < prevState[j + 1].value)
          ) {
            swap(prevState, j, j + 1);
          }
          return prevState.map((item, index) => {
            if (index === j || index === j + 1) {
              return { ...item, status: ElementStates.Changing };
            } else if (index < j) {
              return { ...item, status: ElementStates.Default };
            } else {
              return item;
            }
          });
        });
      }
      await waitUpdate(DELAY_IN_MS);

      setArr((prevState) => {
        return prevState.map((item, index) => {
          if (index === arr.length - i - 1) {
            return { ...item, status: ElementStates.Modified };
          } else if (index < arr.length - i - 1) {
            return { ...item, status: ElementStates.Default };
          } else {
            return item;
          }
        });
      });
    }
    setLoading("");
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.menu} data-testid="sorting-page">
        <fieldset className={styles.fieldset}>
          <RadioInput
            value="selectionSort"
            name="algType"
            label="Выбор"
            onClick={changeFilter}
            defaultChecked
          />
          <RadioInput
            value="bubbleSort"
            name="algType"
            label="Пузырёк"
            onClick={changeFilter}
          />
        </fieldset>
        <div className={styles.handlers}>
          <div className={styles.handlers__type}>
            <Button
              value={Direction.Ascending}
              onClick={changeSortingDirection}
              text="По возрастанию"
              isLoader={loading === "По возрастанию"}
              disabled={loading !== ""}
              sorting={Direction.Ascending}
            />
            <Button
              value={Direction.Descending}
              onClick={changeSortingDirection}
              text="По убыванию"
              isLoader={loading === "По убыванию"}
              disabled={loading !== ""}
              sorting={Direction.Descending}
            />
          </div>
          <Button
            onClick={changeRandom}
            text="Новый массив"
            disabled={loading !== ""}
          />
        </div>
      </div>
      <div className={styles.display}>
        <ul className={styles.list}>
          {arr &&
            arr.map((elem, i) => {
              return (
                <li key={i}>
                  <Column index={elem.value} state={elem.status} />
                </li>
              );
            })}
        </ul>
      </div>
    </SolutionLayout>
  );
};