import { Heap } from "./heap";

export class MinHeap<V> extends Heap<V> {
  add(item: V): void {
    super.add(item);
  }

  removeAll(item: V): void {
    super.removeAll(item);
  }

  isCorrectPairing(
    childIndex: number,
    parentIndex: number,
    getter?: (v: V) => number
  ): boolean {
    const childValue = getter
      ? getter(this.container[childIndex])
      : this.container[childIndex];
    const parentValue = getter
      ? getter(this.container[parentIndex])
      : this.container[parentIndex];

    // children should be greater or equal to parents
    return childValue >= parentValue;
  }
}
