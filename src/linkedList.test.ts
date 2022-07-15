import { LinkedList } from "./linkedList";

describe("LinkedList", () => {
  test("is instatiated empty", () => {
    const list = new LinkedList();
    expect(list.head).toEqual(null);
    expect(list.tail).toEqual(null);
  });

  describe("append", () => {
    test("add value as a node", () => {
      const list = new LinkedList();
      const newNode = list.append("First");
      expect(newNode.value).toEqual("First");
    });

    test("first node added is both the head and tail, pointing to nothing", () => {
      const list = new LinkedList();
      list.append("First");
      expect(list.head.value).toEqual("First");
      expect(list.head.next).toEqual(null);
      expect(list.tail.value).toEqual("First");
      expect(list.tail.next).toEqual(null);
    });

    test("second node becomes the tail, first node pointing to it", () => {
      const list = new LinkedList();
      list.append("First");
      list.append("Second");
      expect(list.head.value).toEqual("First");
      expect(list.head.next.value).toEqual("Second");
      expect(list.tail.value).toEqual("Second");
      expect(list.tail.next).toEqual(null);
    });

    test("works with complex values", () => {
      const list = new LinkedList();
      const complexObj = { key: "foo", value: "bar" };
      list.append(complexObj);
      expect(list.head.value).toBe(complexObj);
      expect(list.tail.value).toBe(complexObj);
    });
  });

  describe("get", () => {
    test("returns node on index", () => {
      const list = new LinkedList();
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
      const list = new LinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      expect(list.get(1000)).toEqual(null);
    });

    test("returns null if list is empty", () => {
      const list = new LinkedList();
      expect(list.get(0)).toEqual(null);
    });

    test("returns head if index is below zero", () => {
      const list = new LinkedList();
      list.append("First");
      expect(list.get(-100).value).toEqual("First");
    });

    test("works with complex values", () => {
      const list = new LinkedList();
      const complexObj = { key: "foo", value: "bar" };
      list.append(complexObj);
      expect(list.get(0).value).toBe(complexObj);
    });
  });

  describe("find", () => {
    test("returns null if list is empty", () => {
      const list = new LinkedList();
      expect(list.find("Mine")).toEqual(null);
      expect(list.find("Yours")).toEqual(null);
    });

    test("returns the node matching the value", () => {
      const list = new LinkedList();
      list.append("Mine");
      list.append("Yours");
      expect(list.find("Mine").value).toEqual("Mine");
      expect(list.find("Yours").value).toEqual("Yours");
    });

    test("returns null if the value is not found", () => {
      const list = new LinkedList();
      list.append("Mine");
      list.append("Yours");
      expect(list.find("Antoher")).toEqual(null);
    });

    test("works with complex values, when using references", () => {
      const list = new LinkedList();
      const complexObj = { key: "foo", value: "bar" };
      list.append(complexObj);
      expect(list.find(complexObj).value).toBe(complexObj);
    });
  });

  describe("findBy", () => {
    test("returns null if list is empty", () => {
      const list = new LinkedList();
      expect(list.findBy((item) => item === "Mine")).toEqual(null);
      expect(list.findBy((item) => item === "Yours")).toEqual(null);
    });

    test("returns the node matching the value", () => {
      const list = new LinkedList();
      list.append("Mine");
      expect(list.findBy((item) => item === "Mine").value).toEqual("Mine");
    });

    test("returns null if the value is not found", () => {
      const list = new LinkedList();
      list.append("Mine");
      list.append("Yours");
      expect(list.findBy((item) => item === "Another")).toEqual(null);
    });

    test("works with complex values, when using references", () => {
      const list = new LinkedList();
      const complexObj = { key: "foo", value: "bar" };
      list.append(complexObj);
      expect(
        list.findBy((item) => (item as { key: string }).key === "foo").value
      ).toEqual(complexObj);
    });
  });

  describe("prepend", () => {
    test("add value as a node", () => {
      const list = new LinkedList();
      const newNode = list.prepend("First");
      expect(newNode.value).toEqual("First");
    });

    test("first node added is both the head and tail, pointing to nothing", () => {
      const list = new LinkedList();
      list.prepend("First");
      expect(list.head.value).toEqual("First");
      expect(list.head.next).toEqual(null);
      expect(list.tail.value).toEqual("First");
      expect(list.tail.next).toEqual(null);
    });

    test("second node becomes the head, first node becomes tail", () => {
      const list = new LinkedList();
      list.prepend("First");
      list.prepend("Second");
      expect(list.head.value).toEqual("Second");
      expect(list.head.next.value).toEqual("First");
      expect(list.tail.value).toEqual("First");
      expect(list.tail.next).toEqual(null);
    });
  });

  describe("delete", () => {
    test("removes the node if it is the only item", () => {
      const list = new LinkedList();
      list.append("First");
      list.delete("First");
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });

    test("removes the node if it is head in a two-item list", () => {
      const list = new LinkedList();
      list.append("First");
      list.append("Second");
      list.delete("First");
      expect(list.head.value).toEqual("Second");
      expect(list.tail.value).toEqual("Second");
    });

    test("removes the node if it is tail in a two-item list", () => {
      const list = new LinkedList();
      list.append("First");
      list.append("Second");
      list.delete("Second");
      expect(list.head.value).toEqual("First");
      expect(list.head.next).toEqual(null);
      expect(list.tail.value).toEqual("First");
      expect(list.tail.next).toEqual(null);
    });

    test("removes the node if it is head in a long list", () => {
      const list = new LinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      list.delete("First");
      expect(list.head.value).toEqual("Second");
      expect(list.head.next.value).toEqual("Third");
      expect(list.tail.value).toEqual("Fourth");
      expect(list.tail.next).toEqual(null);
    });

    test("removes the node if it is tail in a long list", () => {
      const list = new LinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      list.delete("Fourth");
      expect(list.head.value).toEqual("First");
      expect(list.head.next.value).toEqual("Second");
      expect(list.tail.value).toEqual("Third");
      expect(list.tail.next).toEqual(null);
    });

    test("removes the node if it is in the middle in a long list", () => {
      const list = new LinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      list.delete("Second");
      expect(list.head.value).toEqual("First");
      expect(list.head.next.value).toEqual("Third");
      expect(list.tail.value).toEqual("Fourth");
      expect(list.tail.next).toEqual(null);
    });

    test("does not remove anything is a node with the value does not exist", () => {
      const list = new LinkedList();
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
      const list = new LinkedList();
      list.delete("First");
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });

    test("works with complex values, when using references", () => {
      const list = new LinkedList();
      const complexObj = { key: "foo", value: "bar" };
      list.append(complexObj);

      list.delete(complexObj);
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });
  });

  describe("deleteBy", () => {
    test("removes the node if it is the only item", () => {
      const list = new LinkedList();
      list.append("First");
      list.deleteBy((v) => v === "First");
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });

    test("removes the node if it is head in a two-item list", () => {
      const list = new LinkedList();
      list.append("First");
      list.append("Second");
      list.deleteBy((v) => v === "First");
      expect(list.head.value).toEqual("Second");
      expect(list.tail.value).toEqual("Second");
    });

    test("removes the node if it is tail in a two-item list", () => {
      const list = new LinkedList();
      list.append("First");
      list.append("Second");
      list.deleteBy((v) => v === "Second");
      expect(list.head.value).toEqual("First");
      expect(list.head.next).toEqual(null);
      expect(list.tail.value).toEqual("First");
      expect(list.tail.next).toEqual(null);
    });

    test("removes the node if it is head in a long list", () => {
      const list = new LinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      list.deleteBy((v) => v === "First");
      expect(list.head.value).toEqual("Second");
      expect(list.head.next.value).toEqual("Third");
      expect(list.tail.value).toEqual("Fourth");
      expect(list.tail.next).toEqual(null);
    });

    test("removes the node if it is tail in a long list", () => {
      const list = new LinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      list.deleteBy((v) => v === "Fourth");
      expect(list.head.value).toEqual("First");
      expect(list.head.next.value).toEqual("Second");
      expect(list.tail.value).toEqual("Third");
      expect(list.tail.next).toEqual(null);
    });

    test("removes the node if it is in the middle in a long list", () => {
      const list = new LinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      list.delete("Second");
      list.deleteBy((v) => v === "Second");
      expect(list.head.value).toEqual("First");
      expect(list.head.next.value).toEqual("Third");
      expect(list.tail.value).toEqual("Fourth");
      expect(list.tail.next).toEqual(null);
    });

    test("does not remove anything is a node with the value does not exist", () => {
      const list = new LinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      list.deleteBy((v) => v === "Different");

      expect(list.head.value).toEqual("First");
      expect(list.head.next.value).toEqual("Second");
      expect(list.tail.value).toEqual("Fourth");
      expect(list.tail.next).toEqual(null);
    });

    test("does not remove anything if the list is empty", () => {
      const list = new LinkedList();
      list.deleteBy((v) => v === "First");
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });

    test("works with complex values", () => {
      const list = new LinkedList();
      const complexObj = { key: "foo", value: "bar" };
      list.append(complexObj);

      list.deleteBy((v) => (v as { key: string }).key === "foo");
      expect(list.head).toEqual(null);
      expect(list.tail).toEqual(null);
    });
  });

  describe("traverse", () => {
    test("generates items in order", () => {
      const list = new LinkedList();
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

  describe("two node traverse", () => {
    test("generates items in order in pairs", () => {
      const list = new LinkedList();
      const items = ["first", "second", "third", "fourth"];
      items.forEach((item) => list.append(item));
      const gen = list.twoNodeTraverse();
      let item = gen.next();
      let index = 0;
      while (!item.done) {
        expect(item.value.length).toEqual(2);
        expect(item.value[0]?.value || null).toEqual(items[index - 1] || null);
        expect(item.value[1]?.value || null).toEqual(items[index] || null);
        item = gen.next();
        index++;
      }
      expect(index).toEqual(4);
    });
  });

  describe("remove head", () => {
    test("returns head, removing it from a long list", () => {
      const list = new LinkedList();
      list.append("First");
      list.append("Second");
      list.append("Third");
      list.append("Fourth");
      const node = list.removeHead();
      expect(node.value).toBe("First");
      expect(list.head.value).toBe("Second");
      expect(list.tail.value).toBe("Fourth");
    });

    test("returns head, removing it from a two-item list", () => {
      const list = new LinkedList();
      list.append("First");
      list.append("Second");

      const node = list.removeHead();
      expect(node.value).toBe("First");
      expect(list.head.value).toBe("Second");
      expect(list.tail.value).toBe("Second");
    });
    test("returns head, removing it from a single-item list", () => {
      const list = new LinkedList();
      list.append("First");

      const node = list.removeHead();
      expect(node.value).toBe("First");
      expect(list.head).toBe(null);
      expect(list.tail).toBe(null);
    });

    test("returns null if list is empty", () => {
      const list = new LinkedList();

      const node = list.removeHead();
      expect(node).toBe(null);
      expect(list.head).toBe(null);
      expect(list.tail).toBe(null);
    });
  });
});
