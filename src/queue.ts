import { LinkedList } from "./linkedList";

// FIFO - first in, first out
export class Queue {
  public q: LinkedList;

  constructor() {
    this.q = new LinkedList();
  }

  // O(1)
  public enqueue(value: any) {
    this.q.append(value);
  }

  // O(1)
  // Qeueue implementation using arrays under the hood and splice here would be O(n)
  public dequeue() {
    return this.q.removeHead()?.value;
  }
}
