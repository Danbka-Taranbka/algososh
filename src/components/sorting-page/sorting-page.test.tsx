import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { sortSelection } from "./sort-selection";
import { sortBubble } from "./sort-bubble";

jest.setTimeout(10000);

describe('Selection-sort algorithm should correctly sort', () => {
  const setState = jest.fn();
  const setLoading = jest.fn();

  it('an empty array ascending', async () => {
    const arr: { value: number, status: ElementStates }[] = [];
    expect(await sortSelection(setState, setLoading, arr, Direction.Ascending)).toEqual(arr);
  });

  it('an empty array descending', async () => {
    const arr: { value: number, status: ElementStates }[] = [];
    expect(await sortSelection(setState, setLoading, arr, Direction.Descending)).toEqual(arr);
  });

  it('one-element array ascending', async () => {
    const arr: { value: number, status: ElementStates }[] = [
      {value: 45, status: ElementStates.Default},
    ];
    expect(await sortSelection(setState, setLoading, arr, Direction.Ascending)).toEqual(arr);
  });

  it('one-element array descending', async () => {
    const arr: { value: number, status: ElementStates }[] = [
      {value: 45, status: ElementStates.Default},
    ];
    expect(await sortSelection(setState, setLoading, arr, Direction.Descending)).toEqual(arr);
  });

  it('a random array ascending', async () => {
    const arr: { value: number, status: ElementStates }[] = [
      {value: 1, status: ElementStates.Default},
      {value: 8, status: ElementStates.Default},
      {value: 10, status: ElementStates.Default},
      {value: 6, status: ElementStates.Default},
    ];

    const sortedArr: { value: number, status: ElementStates }[] = [
      {value: 1, status: ElementStates.Modified},
      {value: 6, status: ElementStates.Modified},
      {value: 8, status: ElementStates.Modified},
      {value: 10, status: ElementStates.Modified},
    ];
    expect(await sortSelection(setState, setLoading, arr, Direction.Ascending)).toEqual(sortedArr);
  });

  it('a random array descending', async () => {
    const arr: { value: number, status: ElementStates }[] = [
      {value: 1, status: ElementStates.Default},
      {value: 8, status: ElementStates.Default},
      {value: 10, status: ElementStates.Default},
      {value: 6, status: ElementStates.Default},
    ];

    const sortedArr: { value: number, status: ElementStates }[] = [
      {value: 10, status: ElementStates.Modified},
      {value: 8, status: ElementStates.Modified},
      {value: 6, status: ElementStates.Modified},
      {value: 1, status: ElementStates.Modified},
    ];
    expect(await sortSelection(setState, setLoading, arr, Direction.Descending)).toEqual(sortedArr);
  });
});


describe('Bubble-sort algorithm should correctly sort', () => {
  const setState = jest.fn();
  const setLoading = jest.fn();
  it('an empty array ascending', async () => {
    const arr: { value: number, status: ElementStates }[] = [];
    expect(await sortBubble(setState, setLoading, arr, Direction.Ascending)).toEqual(arr);
  });

  it('an empty array descending', async () => {
    const arr: { value: number, status: ElementStates }[] = [];
    expect(await sortBubble(setState, setLoading, arr, Direction.Descending)).toEqual(arr);
  });

  it('one-element array ascending', async () => {
    const arr: { value: number, status: ElementStates }[] = [
      {value: 45, status: ElementStates.Default},
    ];
    expect(await sortBubble(setState, setLoading, arr, Direction.Ascending)).toEqual(arr);
  });

  it('one-element array descending', async () => {
    const arr: { value: number, status: ElementStates }[] = [
      {value: 45, status: ElementStates.Default},
    ];
    expect(await sortBubble(setState, setLoading, arr, Direction.Descending)).toEqual(arr);
  });

  it('a random array ascending', async () => {
    const arr: { value: number, status: ElementStates }[] = [
      {value: 1, status: ElementStates.Default},
      {value: 8, status: ElementStates.Default},
      {value: 10, status: ElementStates.Default},
      {value: 6, status: ElementStates.Default},
    ];

    const sortedArr: { value: number, status: ElementStates }[] = [
      {value: 1, status: ElementStates.Modified},
      {value: 6, status: ElementStates.Modified},
      {value: 8, status: ElementStates.Modified},
      {value: 10, status: ElementStates.Modified},
    ];
    expect(await sortBubble(setState, setLoading, arr, Direction.Ascending)).toEqual(sortedArr);
  });

  it('a random array descending', async () => {
    const arr: { value: number, status: ElementStates }[] = [
      {value: 1, status: ElementStates.Default},
      {value: 8, status: ElementStates.Default},
      {value: 10, status: ElementStates.Default},
      {value: 6, status: ElementStates.Default},
    ];

    const sortedArr: { value: number, status: ElementStates }[] = [
      {value: 10, status: ElementStates.Modified},
      {value: 8, status: ElementStates.Modified},
      {value: 6, status: ElementStates.Modified},
      {value: 1, status: ElementStates.Modified},
    ];
    expect(await sortBubble(setState, setLoading, arr, Direction.Descending)).toEqual(sortedArr);
  });
});