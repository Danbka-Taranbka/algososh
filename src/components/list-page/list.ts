export class ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  constructor(value: T, next?: ListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface IList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  addByIndex: (element: T, position: number) => void;
  deleteByIndex: (position: number) => void;
  getSize: () => number;
  toArray: () => T[];
}

export class List<T> implements IList<T> {
  private head: ListNode<T> | null;
  private size: number;
  constructor(initialArr: T[]) {
    this.head = null;
    this.size = 0;

    if (initialArr) {
      initialArr.forEach((value) => this.append(value));
    }
  }

  get headNode() {
    return this.head;
  }

  get tailNode() {
    let currenTailNode = this.head;
    while (currenTailNode && currenTailNode.next) {
      currenTailNode = currenTailNode.next;
    }
    return currenTailNode;
  }

  toArray() {
    if (this.head === null) return [];
    let list: T[] = [];
    let current: ListNode<T> | null = this.head;

    do {
      list.push(current.value);
      current = current.next;
    } while (current);

    return list;
  }

  deleteByIndex(position: number) {
    let temp = this.head;
    if (position === 0) {
      this.deleteHead();
    } else {
      for (let i = 0; temp != null && i < position - 1; i++) temp = temp.next;
      if (temp === null || temp.next === null) return;
      let next = temp.next.next;
      temp.next = next;
    }
    this.size--;
  }

  addByIndex(element: T, currIndex: number) {
    if (currIndex < 0 || currIndex > this.size) {
      return;
    } else {
      const node = new ListNode(element);

      let currentNode = this.head;
      if (currIndex === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let prevNode = null;
        let index = 0;
        while (index++ < currIndex) {
          prevNode = currentNode;
          currentNode = currentNode!.next;
        }
        prevNode!.next = node;
        node.next = currentNode;
      }

      this.size++;
    }
  }

  prepend(element: T) {
    const node = new ListNode(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      this.head = node;
      this.head.next = current;
    }
    this.size++;
  }

  append(element: T) {
    const node = new ListNode(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  deleteHead() {
    if (this.head?.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
    }
    this.size--;
  }

  deleteTail() {
    if (this.head !== null) {
      let current = this.head;
      while (current.next?.next) {
        current = current.next;
      }
      current.next = null;
      this.size--;
    }
  }

  getSize() {
    return this.size;
  }
}