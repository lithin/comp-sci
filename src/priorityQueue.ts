import { MinHeap } from "./minHeap";

interface PriorityItem {
  priority: number;
  value: string;
}

export class PriorityQueue extends MinHeap<PriorityItem> {
  isCorrectPairing(childIndex: number, parentIndex: number): boolean {
    return super.isCorrectPairing(
      childIndex,
      parentIndex,
      ({ priority }) => priority
    );
  }

  shift() {
    return super.removeByIndex(0);
  }
}
