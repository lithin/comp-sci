import { LinkedList } from "./linkedList";

// Uses prepend and removeHead to achieve O(n) - would have been the same as append and removeTail in a doubly linked list
// Using array and push/splice would have been likely the same time complexity since we wouldn't need to copy the array over when removing the last item
// However, using linked list makes it uniform with Queue

export class Stack {
  public s: LinkedList;

  constructor() {
    this.s = new LinkedList();
  }

  public push(value: any) {
    this.s.prepend(value);
  }

  public pop() {
    return this.s.removeHead()?.value;
  }
}
