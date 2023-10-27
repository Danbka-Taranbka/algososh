import { DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { swap, waitUpdate } from "../../utils/utils";

export const sortBubble = async (
  setArr: React.Dispatch<React.SetStateAction<{ value: number, status: ElementStates }[]>>,
  setLoading: React.Dispatch<
    React.SetStateAction<string>
  >,
  arr: { value: number, status: ElementStates }[],
  sortingDirection: string,
) => {
      for (let i = 0; i < arr.length; i++) {
        setArr([...arr]);
        for (let j = 0; j < arr.length - i; j++) {
          if (j !== arr.length - i - 1) {
            arr[j].status = ElementStates.Changing;
            arr[j + 1].status = ElementStates.Changing;
            setArr([...arr]);
            await waitUpdate(DELAY_IN_MS);
            if (sortingDirection === Direction.Ascending) {
              if (arr[j].value > arr[j + 1].value) {
                swap(arr, j, j + 1);
              }
            } else {
              if (arr[j].value < arr[j + 1].value) {
                swap(arr, j + 1, j);
              }
            }
            if (j !== arr.length - 1) {
              arr[j].status = ElementStates.Default;
              arr[j + 1].status = ElementStates.Default;
            }
          } else {
            arr[j].status = ElementStates.Modified;
          }
          setArr([...arr]);
        }
        setArr([...arr]);
      }
      setLoading('');
      return arr;
};