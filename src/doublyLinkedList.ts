class DoublyLinkedListNode {
  public value: any;
  public next: DoublyLinkedListNode | null;
  public prev: DoublyLinkedListNode | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }

  public linkNext(node: DoublyLinkedListNode) {
    this.next = node;
  }

  public linkPrev(node: DoublyLinkedListNode) {
    this.prev = node;
  }
}

export class DoublyLinkedList {
  public head: DoublyLinkedListNode | null;
  public tail: DoublyLinkedListNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  // indexed from 0 from head
  // O(n)
  public get(n: number): DoublyLinkedListNode | null {
    let node = this.head;

    for (let i = 0; node !== null && i < n; i++) {
      node = node.next;
    }

    return node;
  }

  // O(n)
  public find(value: any): DoublyLinkedListNode | null {
    let node = this.head;

    while (node !== null && node.value !== value) {
      node = node.next;
    }

    return node;
  }

  // O(1)
  public append(value: any): DoublyLinkedListNode {
    const newNode = new DoublyLinkedListNode(value);
    if (this.tail) {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    return newNode;
  }

  // O(n)
  public delete(value: any): DoublyLinkedListNode | null {
    let node = this.head;

    while (node !== null) {
      if (node.value === value) {
        if (node.prev) {
          node.prev.next = node.next;
        }

        if (node.next) {
          node.next.prev = node.prev;
        }

        if (node === this.head) {
          if (node.next) {
            node.next.prev = null;
            this.head = node.next;
          } else {
            this.head = null;
          }
        }

        if (node === this.tail) {
          if (node.prev) {
            node.prev.next = null;
          }
          this.tail = node.prev;
        }

        break;
      }

      node = node.next;
    }

    return node;
  }

  // O(n) - when called in a for-loop
  public *traverse(): Iterator<any> {
    let node = this.head;

    while (node !== null) {
      yield node.value;
      node = node.next;
    }
  }

  // O(n) - when called in a for-loop
  public *traverseReversed(): Iterator<any> {
    let node = this.tail;

    while (node !== null) {
      yield node.value;
      node = node.prev;
    }
  }
}
