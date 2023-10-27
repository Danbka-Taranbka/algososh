import { ElementStates } from "../../types/element-states";

export class Wrapper<T> {
  value: T;
  isCircleAbove: boolean;
  isCircleBelow: boolean;
  head: boolean;
  tail: boolean;
  status: ElementStates;

  constructor(
    value: T,
    status: ElementStates = ElementStates.Default,
    isCircleAbove = false,
    isCircleBelow = false,
    head = false,
    tail = false
  ) {
    this.value = value;
    this.status = status;
    this.isCircleAbove = isCircleAbove;
    this.isCircleBelow = isCircleBelow;
    this.head = head;
    this.tail = tail;
  }

  public fromArray(values: T[]): Wrapper<T>[] {
    let resultArray: Wrapper<T>[] = [];
    if (values) {
      resultArray = values.map((value) => new Wrapper<T>(value));
      resultArray[0].head = true;
      resultArray[resultArray.length - 1].tail = true;
    }
    return resultArray;
  }
}