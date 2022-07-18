export class Heap<V> {
  public container: Array<V>;

  constructor() {
    this.container = [];
  }

  // O(logn) - complexity due to sorting up
  add(item: V) {
    this.container.push(item);
    this.sortUp();
  }

  // O(logn)
  remove(item: V) {
    const index = this.container.findIndex((value) => value === item);
    return this.removeByIndex(index);
  }

  // O(logn)
  removeByIndex(index: number) {
    if (index === this.container.length - 1) {
      return this.container.pop();
    }

    const item = this.container[index];

    this.container[index] = this.container.pop();
    // when removing last leaf, there is no need to re-sort
    if (
      index === 0 ||
      this.isCorrectPairing(index, this.getParentIndex(index))
    ) {
      // values "above" the current node are sorted so we only need to examine "below"
      this.sortDown(index);
    } else {
      // values "below" the current node are sorted so we only need to bubble the value up
      this.sortUp(index);
    }

    return item;
  }

  // O(nlogn)
  removeAll(item: V) {
    let index = this.container.findIndex((value) => value === item);
    while (index !== -1) {
      this.removeByIndex(index);

      index = this.container.findIndex((value) => value === item);
    }
  }

  private getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2); // integer division
  }

  private getChildrenIndices(parentIndex: number) {
    return [parentIndex * 2 + 1, parentIndex * 2 + 2];
  }

  // O(logn)
  private sortUp(index?: number) {
    const childIndex =
      typeof index !== "number" ? this.container.length - 1 : index;

    if (childIndex < 1) {
      // root has no parents
      return;
    }

    const parentIndex = this.getParentIndex(childIndex);

    if (!this.isCorrectPairing(childIndex, parentIndex)) {
      this.swap(childIndex, parentIndex);
      this.sortUp(parentIndex);
    }
  }

  // O(logn)
  private sortDown(index?: number) {
    const parentIndex = index || 0;

    const [leftChildIndex, rightChildIndex] =
      this.getChildrenIndices(parentIndex);

    if (leftChildIndex > this.container.length - 1) {
      // the alleged parent is actually a leaf
      return;
    }

    const childIndex =
      typeof this.container[rightChildIndex] === "undefined" ||
      !this.isCorrectPairing(leftChildIndex, rightChildIndex)
        ? leftChildIndex
        : rightChildIndex;

    if (!this.isCorrectPairing(childIndex, parentIndex)) {
      this.swap(childIndex, parentIndex);
      this.sortDown(childIndex);
    }
  }

  private swap(childIndex: number, parentIndex: number) {
    const temp = this.container[childIndex];
    this.container[childIndex] = this.container[parentIndex];
    this.container[parentIndex] = temp;
  }

  protected isCorrectPairing(childIndex: number, parentIndex: number): boolean {
    throw new Error("Not implemented");
  }
}
