import { DoublyLinkedList } from "./doublyLinkedList";

describe("DoublyLinkedList", () => {
  test("is instatiated empty", () => {
    const list = new DoublyLinkedList();
    expect(list.head).toEqual(null);
    expect(list.tail).toEqual(null);
  });

  describe("get", () => {
    test("returns node on index", () => {
      const list = new DoublyLinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      expect(list.get(0).value).toEqual("First");
      expect(list.get(1).value).toEqual("Second");
      expect(list.get(2).value).toEqual("Third");
      expect(list.get(3).value).toEqual("Fourth");
    });

    test("returns null if index is not in list", () => {
      const list = new DoublyLinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      expect(list.get(1000)).toEqual(null);
    });

    test("returns null if list is empty", () => {
      const list = new DoublyLinkedList();
      expect(list.get(0)).toEqual(null);
    });

    test("returns head if index is below zero", () => {
      const list = new DoublyLinkedList();
      list.append("First");
      expect(list.get(-100).value).toEqual("First");
    });
  });

  describe("find", () => {
    test("returns null if list is empty", () => {
      const list = new DoublyLinkedList();
      expect(list.find("Mine")).toEqual(null);
      expect(list.find("Yours")).toEqual(null);
    });

    test("returns the node matching the value", () => {
      const list = new DoublyLinkedList();
      list.append("Mine");
      list.append("Yours");
      expect(list.find("Mine").value).toEqual("Mine");
      expect(list.find("Yours").value).toEqual("Yours");
    });

    test("returns null if the value is not found", () => {
      const list = new DoublyLinkedList();
      list.append("Mine");
      list.append("Yours");
      expect(list.find("Antoher")).toEqual(null);
    });
  });

  describe("append", () => {
    test("add value as a node", () => {
      const list = new DoublyLinkedList();
      const newNode = list.append("First");
      expect(newNode.value).toEqual("First");
    });

    test("first node added is both the head and tail, pointing to nothing", () => {
      const list = new DoublyLinkedList();
      list.append("First");
      expect(list.head.value).toEqual("First");
      expect(list.head.next).toEqual(null);
      expect(list.head.prev).toEqual(null);
      expect(list.tail.value).toEqual("First");
      expect(list.tail.next).toEqual(null);
      expect(list.tail.prev).toEqual(null);
    });

    test("second node becomes the tail, both nodes point at each other", () => {
      const list = new DoublyLinkedList();
      list.append("First");
      list.append("Second");
      expect(list.head.value).toEqual("First");
      expect(list.head.next.value).toEqual("Second");
      expect(list.head.prev).toEqual(null);
      expect(list.tail.value).toEqual("Second");
      expect(list.tail.next).toEqual(null);
      expect(list.tail.prev.value).toEqual("First");
    });
  });

  describe("delete", () => {
    test("removes the node if it is the only item", () => {
      const list = new DoublyLinkedList();
      list.append("First");
      list.delete("First");
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });

    test("removes the node if it is head in a two-item list", () => {
      const list = new DoublyLinkedList();
      list.append("First");
      list.append("Second");
      list.delete("First");
      expect(list.head.value).toEqual("Second");
      expect(list.head.next).toEqual(null);
      expect(list.tail.value).toEqual("Second");
      expect(list.tail.next).toEqual(null);
    });

    test("removes the node if it is tail in a two-item list", () => {
      const list = new DoublyLinkedList();
      list.append("First");
      list.append("Second");
      list.delete("Second");
      expect(list.head.value).toEqual("First");
      expect(list.head.next).toEqual(null);
      expect(list.head.prev).toEqual(null);
      expect(list.tail.value).toEqual("First");
      expect(list.tail.next).toEqual(null);
      expect(list.tail.prev).toEqual(null);
    });

    test("removes the node if it is head in a long list", () => {
      const list = new DoublyLinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      list.delete("First");
      expect(list.head.value).toEqual("Second");
      expect(list.head.next.value).toEqual("Third");
      expect(list.head.prev).toEqual(null);
      expect(list.tail.value).toEqual("Fourth");
      expect(list.tail.next).toEqual(null);
      expect(list.tail.prev.value).toEqual("Third");
    });

    test("removes the node if it is tail in a long list", () => {
      const list = new DoublyLinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      list.delete("Fourth");
      expect(list.head.value).toEqual("First");
      expect(list.head.next.value).toEqual("Second");
      expect(list.head.prev).toEqual(null);
      expect(list.tail.value).toEqual("Third");
      expect(list.tail.next).toEqual(null);
      expect(list.tail.prev.value).toEqual("Second");
    });

    test("removes the node if it is in the middle in a long list", () => {
      const list = new DoublyLinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      list.delete("Second");
      expect(list.head.value).toEqual("First");
      expect(list.head.next.value).toEqual("Third");
      expect(list.head.prev).toEqual(null);
      expect(list.tail.value).toEqual("Fourth");
      expect(list.tail.next).toEqual(null);
      expect(list.tail.prev.value).toEqual("Third");
      expect(list.get(1).value).toEqual("Third");
      expect(list.get(1).next.value).toEqual("Fourth");
      expect(list.get(1).prev.value).toEqual("First");
    });

    test("does not remove anything is a node with the value does not exist", () => {
      const list = new DoublyLinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      list.delete("Different");
      expect(list.head.value).toEqual("First");
      expect(list.head.next.value).toEqual("Second");
      expect(list.tail.value).toEqual("Fourth");
      expect(list.tail.next).toEqual(null);
    });

    test("does not remove anything if the list is empty", () => {
      const list = new DoublyLinkedList();
      list.delete("First");
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });
  });

  describe("traverse", () => {
    test("generates items in order", () => {
      const list = new DoublyLinkedList();
      const items = ["first", "second", "third", "fourth"];
      items.forEach((item) => list.append(item));
      const gen = list.traverse();
      let item = gen.next();
      let index = 0;
      while (!item.done) {
        expect(item.value).toEqual(items[index]);
        item = gen.next();
        index++;
      }
      expect(index).toEqual(4);
    });
  });

  describe("traverse reversed", () => {
    test("generates items in opposite order", () => {
      const list = new DoublyLinkedList();
      const items = ["first", "second", "third", "fourth"];
      items.forEach((item) => list.append(item));
      const gen = list.traverseReversed();
      let item = gen.next();
      let index = 1;
      while (!item.done) {
        expect(item.value).toEqual(items[items.length - index]);
        item = gen.next();
        index++;
      }
      expect(index).toEqual(5);
    });
  });
});
