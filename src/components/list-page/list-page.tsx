import React, { useRef, useState, useEffect, MouseEvent } from "react";

import styles from "./list-page.module.css";


import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

import { TaskInput } from "../task-input/task-input";

import { waitUpdate } from "../../utils/utils";

import { ElementStates } from "../../types/element-states";
import { ButtonsTypes } from "../../types/buttons";
import { useForm } from "../../hooks/useForm";

import { List } from "./list";
import { Wrapper } from "./wrapper";

import { HEAD, TAIL } from "../../constants/element-captions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {
  const [loading, setLoading] = useState<string>("");
  const { values, handleChange, setValues } = useForm<{
    inputValue: string;
    inputIndex: string;
  }>({
    inputValue: "",
    inputIndex: "",
  });

  const listRef = useRef(
    new List<Wrapper<string>>(
      Wrapper.prototype.fromArray(["12", "13", "14", "15"])
    )
  );
  const [list, setList] = useState<Wrapper<string>[]>([]);

  const onLoadingChange = (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(e.currentTarget.innerText);
  };

  useEffect(() => {
    setList(listRef.current.toArray());
  }, []);

  const onAddHead = async (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    if (listRef.current.headNode) {
      listRef.current.headNode.value.isCircleAbove = true;
      setList(listRef.current.toArray());

      const newElement = new Wrapper(
        values.inputValue,
        ElementStates.Modified
      );
      await waitUpdate(SHORT_DELAY_IN_MS);

      listRef.current.headNode!.value.isCircleAbove = false;
      listRef.current.headNode!.value.head = false;
      listRef.current.prepend(newElement);
      listRef.current.headNode!.value.head = true;
      setList(listRef.current.toArray());
      await waitUpdate(SHORT_DELAY_IN_MS);

      newElement.status = ElementStates.Default;
      setList(listRef.current.toArray());
      setValues((prevState) => {
        return { ...prevState, inputValue: "" };
      });
      setLoading("");
    }
  };

  const onAddToTail = async (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    if (listRef.current.headNode) {
      listRef.current.tailNode!.value.isCircleAbove = true;
      setList(listRef.current.toArray());

      const newElement = new Wrapper(
        values.inputValue,
        ElementStates.Modified
      );
      await waitUpdate(SHORT_DELAY_IN_MS);

      listRef.current.tailNode!.value.isCircleAbove = false;
      listRef.current.tailNode!.value.tail = false;
      listRef.current.append(newElement);
      listRef.current.tailNode!.value.tail = true;
      setList(listRef.current.toArray());
      await waitUpdate(SHORT_DELAY_IN_MS);

      newElement.status = ElementStates.Default;
      setList(listRef.current.toArray());
      setValues((prevState) => {
        return { ...prevState, inputValue: "" };
      });
      setLoading("");
    }
  };

  const onDeleteHead = async (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    if (listRef.current.headNode) {
      listRef.current.headNode!.value.isCircleBelow = true;
      setList(listRef.current.toArray());
      await waitUpdate(SHORT_DELAY_IN_MS);

      listRef.current.deleteHead();
      listRef.current.headNode.value.head = true;
      setList(listRef.current.toArray());
    }
    setLoading("");
  };

  const onDeleteTail = async (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    if (listRef.current.headNode) {
      listRef.current.tailNode!.value.isCircleBelow = true;
      setList(listRef.current.toArray());
      await waitUpdate(SHORT_DELAY_IN_MS);

      listRef.current.deleteTail();
      listRef.current.tailNode!.value.tail = true;
      setList(listRef.current.toArray());
    }
    setLoading("");
  };

  const onAddByIndex = async (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    let currentNode = listRef.current.headNode;
    let currentIndex = 0;
    const index = Number(values.inputIndex);

    while (currentNode && currentIndex <= index) {
      currentNode.value.isCircleAbove = true;
      setList(listRef.current.toArray());
      await waitUpdate(SHORT_DELAY_IN_MS);

      currentNode.value.status = ElementStates.Changing;
      currentNode.value.isCircleAbove = false;

      currentNode = currentNode?.next;
      currentIndex++;
    }

    const newElement = new Wrapper(
      values.inputValue,
      ElementStates.Modified
    );
    listRef.current.addByIndex(newElement, index);
    if (index === 0 && listRef.current.headNode) {
      listRef.current.headNode.value.head = true;
      listRef.current.headNode.next!.value.head = false;
    }

    currentNode = listRef.current.headNode;

    while (currentNode) {
      if (currentNode.value !== newElement) {
        currentNode.value.status = ElementStates.Default;
      }
      currentNode = currentNode?.next;
    }
    setList(listRef.current.toArray());

    await waitUpdate(SHORT_DELAY_IN_MS);
    newElement.status = ElementStates.Default;
    setList(listRef.current.toArray());
    setValues((prevState) => {
      return { ...prevState, inputValue: "" };
    });
    setLoading("");
  };

  const onDeleteByIndex = async (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    const index = Number(values.inputIndex);

    let currentNode = listRef.current.headNode;
    let currentIndex = 0;
    while (currentNode && currentIndex < index) {
      currentNode.value.status = ElementStates.Changing;
      currentNode = currentNode?.next;
      currentIndex++;
      setList(listRef.current.toArray());
      await waitUpdate(SHORT_DELAY_IN_MS);
    }

    currentNode!.value.isCircleBelow = true;
    setList(listRef.current.toArray());
    await waitUpdate(SHORT_DELAY_IN_MS);

    listRef.current.deleteByIndex(index);
    listRef.current.tailNode!.value.tail = true;
    currentNode = listRef.current.headNode;
    currentIndex = 0;
    while (currentNode && currentIndex < index) {
      currentNode.value.status = ElementStates.Default;
      currentNode = currentNode?.next;
      currentIndex++;
    }
    setList(listRef.current.toArray());
    setValues((prevState) => {
      return { ...prevState, inputValue: "" };
    });
    setLoading("");
  };

  const buttonsTop = [
    {
      text: ButtonsTypes.Prepend,
      onClick: onAddHead,
      loader: loading === ButtonsTypes.Prepend,
      disabled: values.inputValue === "" || loading !== "",
    },
    {
      text: ButtonsTypes.Append,
      onClick: onAddToTail,
      loader: loading === ButtonsTypes.Append,
      disabled: values.inputValue === "" || loading !== "",
    },
    {
      text: ButtonsTypes.DeleteHead,
      onClick: onDeleteHead,
      loader: loading === ButtonsTypes.DeleteHead,
      disabled: loading !== "" || loading !== "",
    },
    {
      text: ButtonsTypes.DeleteTail,
      onClick: onDeleteTail,
      loader: loading === ButtonsTypes.DeleteTail,
      disabled: loading !== "" || loading !== "",
    },
  ];
  const buttonsBottom = [
    {
      text: ButtonsTypes.AddByIndex,
      onClick: onAddByIndex,
      loader: loading === ButtonsTypes.AddByIndex,
      listBottom: true,
      disabled:
        values.inputIndex === "" ||
        values.inputValue === "" ||
        loading !== "" ||
        Number(values.inputIndex) > listRef.current.getSize() - 1 ||
        Number(values.inputIndex) < 0,
    },
    {
      text: ButtonsTypes.DeleteByIndex,
      onClick: onDeleteByIndex,
      loader: loading === ButtonsTypes.DeleteByIndex,
      listBottom: true,
      disabled:
        values.inputIndex === "" ||
        loading !== "" ||
        Number(values.inputIndex) > listRef.current.getSize() - 1 ||
        Number(values.inputIndex) < 0,
    },
  ];

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.menu} data-testid="list-page">
        <TaskInput
          buttons={buttonsTop}
          isLimitText={true}
          maxLength={4}
          value={values.inputValue}
          onInput={handleChange}
          name="inputValue"
        />
        <TaskInput
          buttons={buttonsBottom}
          value={values.inputIndex}
          onInput={handleChange}
          name="inputIndex"
          type="number"
        />
      </div>
      <div className={styles.container}>
        <ul className={styles.list}>
          {list &&
            list.map((item, i) => {
              return (
                <li className={styles.list__item} key={i}>
                  <Circle
                    letter={item.isCircleBelow ? "" : item.value}
                    index={i}
                    head={
                      item.isCircleAbove ? (
                        <Circle
                          state={ElementStates.Changing}
                          letter={values.inputValue}
                          isSmall
                        />
                      ) : item.head ? (
                        HEAD
                      ) : null
                    }
                    tail={
                      item.isCircleBelow ? (
                        <Circle
                          state={ElementStates.Changing}
                          letter={item.value}
                          isSmall
                        />
                      ) : item.tail ? (
                        TAIL
                      ) : null
                    }
                    state={item.status}
                  />
                  {i !== list.length - 1 ? <ArrowIcon /> : null}
                </li>
              );
            })}
        </ul>
      </div>
    </SolutionLayout>
  );
};