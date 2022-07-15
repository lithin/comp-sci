class LinkedListNode<V> {
  public value: V;
  public next: LinkedListNode<V> | null;

  constructor(value: V) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<V> {
  public head: LinkedListNode<V> | null;
  public tail: LinkedListNode<V> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  // indexed from 0
  // O(n)
  public get(n: number): LinkedListNode<V> | null {
    let node = this.head;

    for (let i = 0; node !== null && i < n; i++) {
      node = node.next;
    }

    return node;
  }

  // O(n)
  public find(value: V): LinkedListNode<V> | null {
    let node = this.head;

    while (node !== null && node.value !== value) {
      node = node.next;
    }

    return node;
  }

  // O(n)
  public findBy(fn: (item: V) => boolean): LinkedListNode<V> | null {
    let node = this.head;

    while (node !== null && !fn(node.value)) {
      node = node.next;
    }

    return node;
  }

  // O(1)
  public append(value: V): LinkedListNode<V> {
    const newNode = new LinkedListNode(value);
    if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    return newNode;
  }

  // O(1)
  public prepend(value: V): LinkedListNode<V> {
    const newNode = new LinkedListNode(value);
    if (this.head) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    return newNode;
  }

  // Internal util function for deleting nodes in a clean way (single responsibiility principles)
  private removeNode(
    prevNode: LinkedListNode<V>,
    currentNode: LinkedListNode<V>
  ) {
    if (prevNode) {
      prevNode.next = currentNode.next;
    }
    if (currentNode === this.head) {
      if (currentNode.next) {
        this.head = currentNode.next;
      } else {
        this.head = null;
      }
    }
    if (currentNode === this.tail) {
      this.tail = prevNode;
    }
  }

  // O(n)
  public delete(value: V): LinkedListNode<V> | null {
    const gen = this.twoNodeTraverse();
    let item = gen.next();

    while (!item.done) {
      const [prevNode, currentNode] = item.value;
      if (currentNode.value === value) {
        this.removeNode(prevNode, currentNode);
        break;
      }
      item = gen.next();
    }

    return item.value?.[1] || null;
  }

  // O(n)
  public deleteBy(fn: (item: V) => boolean): LinkedListNode<V> | null {
    const gen = this.twoNodeTraverse();
    let item = gen.next();

    while (!item.done) {
      const [prevNode, currentNode] = item.value;
      if (fn(currentNode.value)) {
        this.removeNode(prevNode, currentNode);
        break;
      }
      item = gen.next();
    }

    return item.value?.[1] || null;
  }

  // O(n) - when called in a for-loop
  public *traverse(): Iterator<V> {
    let node = this.head;

    while (node !== null) {
      yield node.value;
      node = node.next;
    }
  }

  // O(n) - when called in a for-loop
  // used internally for removal
  public *twoNodeTraverse(): Iterator<
    [LinkedListNode<V> | null, LinkedListNode<V> | null]
  > {
    let prevNode = null;
    let currentNode = this.head;

    while (currentNode !== null) {
      yield [prevNode, currentNode];
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
  }

  // O(1)
  public removeHead(): LinkedListNode<V> | null {
    const node = this.head;
    if (node) {
      if (this.head === this.tail) {
        this.tail = null;
      }
      this.head = this.head.next;
    }
    return node;
  }
}
