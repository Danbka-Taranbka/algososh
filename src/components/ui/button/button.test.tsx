import renderer from 'react-test-renderer';
import { Button } from './button'
import { render, screen, fireEvent } from "@testing-library/react";

describe('Button', () => {

  it('is rendered on page!', () => {
    render(<Button/>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it('renders correctly without text!', () => {
    const tree = renderer.create(<Button/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with text!', () => {
    const tree = renderer.create(<Button text='Рассчитать'/>);
    expect(tree).toMatchSnapshot();
  });

  it('disabled renders correctly!', () => {
    const tree = renderer.create(<Button disabled={true}/>);
    expect(tree).toMatchSnapshot();
  });

  it('loading renders correctly!', () => {
    const tree = renderer.create(<Button isLoader={true}/>);
    expect(tree).toMatchSnapshot();
  });
  
  it('callback works correctly!', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});