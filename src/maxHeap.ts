import { Heap } from "./heap";

export class MaxHeap extends Heap<number> {
  add(item: number): void {
    super.add(item);
  }

  removeAll(item: number): void {
    super.removeAll(item);
  }

  isCorrectPairing(childIndex: number, parentIndex: number): boolean {
    // children should be lesser or equal to parents
    return this.container[childIndex] <= this.container[parentIndex];
  }
}
