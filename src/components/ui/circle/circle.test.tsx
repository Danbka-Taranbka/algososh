import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Circle', () => {

  it('renders correctly without text!', () => {
    const tree = renderer.create(<Circle letter=''/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with text!', () => {
    const tree = renderer.create(<Circle letter='A'/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with head!', () => {
    const tree = renderer.create(<Circle head="head"/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with react-head!', () => {
    const tree = renderer.create(<Circle head={<Circle/>}/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with tail!', () => {
    const tree = renderer.create(<Circle tail="tail"/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with react-tail!', () => {
    const tree = renderer.create(<Circle tail={<Circle/>}/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with index!', () => {
    const tree = renderer.create(<Circle index={1}/>);
    expect(tree).toMatchSnapshot();
  });

  it('isSmall renders correctly!', () => {
    const tree = renderer.create(<Circle isSmall={true}/>);
    expect(tree).toMatchSnapshot();
  });

  it('default state renders correctly!', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default}/>);
    expect(tree).toMatchSnapshot();
  });

  it('changing state renders correctly!', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing}/>);
    expect(tree).toMatchSnapshot();
  });

  it('Modified state renders correctly!', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified}/>);
    expect(tree).toMatchSnapshot();
  });
});