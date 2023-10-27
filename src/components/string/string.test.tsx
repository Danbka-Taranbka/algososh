import { ElementStates } from "../../types/element-states";
import { reverse as reverseArr } from "../../utils/utils";

jest.setTimeout(10000);

describe('Algorithm should reverse string correctly', () => {
  const setState = jest.fn();

  it('with not-odd amount of elements', async () => {
    const state: { status: ElementStates, value: string }[] = [
      {value: 'h', status: ElementStates.Default},
      {value: 'e', status: ElementStates.Default},
      {value: 'l', status: ElementStates.Default},
      {value: 'l', status: ElementStates.Default},
      {value: 'o', status: ElementStates.Default},
    ];
    expect(await reverseArr(state, setState)).toEqual(state.reverse());
  });

  it('with odd amount of elements', async () => {
    const state: { status: ElementStates, value: string }[] = [
      {value: 'b', status: ElementStates.Default},
      {value: 'a', status: ElementStates.Default},
      {value: 'l', status: ElementStates.Default},
      {value: 'l', status: ElementStates.Default},
    ];
    expect(await reverseArr(state, setState)).toEqual(state.reverse());
  });

  it('with one element', async () => {
    const state: { status: ElementStates, value: string }[] = [
      {value: 'b', status: ElementStates.Default},
    ];
    expect(await reverseArr(state, setState)).toEqual(state.reverse());
  });

  it('with an empty element', async () => {
    const state: { status: ElementStates, value: string }[] = [
      {value: 'b', status: ElementStates.Default},
    ];
    expect(await reverseArr(state, setState)).toEqual(state.reverse());
  });
})