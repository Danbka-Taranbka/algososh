interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.stackSize > 0) {
      this.container.pop();
    }
  };

  clear = () => {
    this.container = [];
  };

  get stackSize() {
    return this.container.length;
  }

  get peek() {
    if (this.stackSize > 0) {
      return this.stackSize - 1;
    } else {
      return null;
    }
  }

  get elements() {
    return this.container;
  }
}