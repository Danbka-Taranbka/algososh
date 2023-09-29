interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array.from({ length: size });
  }

  enqueue = (item: T) => {
    if (this.tail >= this.size) {
      return;
    }

    this.container[this.tail] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    this.container[this.head] = null;
    this.length--;
    if (!this.isEmpty) {
      this.head++;
    }
  };

  clear = () => {
    this.container = Array.from({ length: this.size });
    this.head = 0;
    this.tail = 0;
  };

  get elements() {
    return this.container;
  }

  get getHead() {
    return this.head;
  }

  get getTail() {
    return this.tail;
  }

  get isEmpty() {
    return this.length === 0;
  }
}