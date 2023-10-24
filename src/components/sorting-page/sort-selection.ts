import { DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { swap, waitUpdate } from "../../utils/utils";


export const sortSelection = async (
  setArr: React.Dispatch<React.SetStateAction<{ value: number, status: ElementStates }[]>>,
  setLoading: React.Dispatch<
    React.SetStateAction<string>
  >,
  arr: { value: number, status: ElementStates }[],
  sortingDirection: string,
) => {
    for (let i=0; i<arr.length; i++) {
      arr[i].status = ElementStates.Changing;
      let curr = {item: arr[i], index: i};
      setArr([...arr]);
      for (let j=i+1; j<arr.length; j++) {
        arr[j].status = ElementStates.Changing;
        setArr([...arr]);
        waitUpdate(DELAY_IN_MS);
        if (sortingDirection === Direction.Ascending) {
          if (arr[i].value > arr[j].value && arr[j].value < curr.item.value) {
            curr.item = arr[j];
            curr.index = j;
          }
          if (j === arr.length - 1) {
            swap(arr, i, curr.index);
            arr[curr.index].status = ElementStates.Default;
          }
        } else {
          if (arr[i].value < arr[j].value && arr[j].value > curr.item.value) {
            curr.item = arr[j];
            curr.index = j;
          }
          if (j === arr.length - 1) {
            swap(arr, curr.index, i);
            arr[curr.index].status = ElementStates.Default;
          }
        }
        arr[j].status = ElementStates.Default;
        setArr([...arr]);
      }
      arr[i].status = ElementStates.Modified;
      setArr([...arr]);
    }
    setLoading('');
    return arr;
};