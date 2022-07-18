import { MinHeap } from "./minHeap";

describe("min heap - children are greater or equal to parent", () => {
  describe("add", () => {
    test("keeps the right order", () => {
      const minHeap = new MinHeap();
      minHeap.add(3);
      minHeap.add(1);
      minHeap.add(44);
      minHeap.add(4);
      minHeap.add(1);
      minHeap.add(3);
      minHeap.add(85);
      minHeap.add(2);
      minHeap.add(6);
      minHeap.add(4);
      minHeap.add(8);
      minHeap.add(2);

      expect(minHeap.container).toEqual([1, 1, 2, 2, 3, 3, 85, 4, 6, 4, 8, 44]);
    });
  });

  describe("remove keeps the right order", () => {
    test("when removing an easy leaf", () => {
      const minHeap = new MinHeap();
      minHeap.add(3);
      minHeap.add(1);
      minHeap.add(44);
      minHeap.add(4);
      minHeap.add(1);
      minHeap.add(3);
      minHeap.add(85);
      minHeap.add(2);
      minHeap.add(6);
      minHeap.add(4);
      minHeap.add(8);
      minHeap.add(2);

      minHeap.removeAll(85);

      expect(minHeap.container).toEqual([1, 1, 2, 2, 3, 3, 44, 4, 6, 4, 8]);
    });

    test("when removing a more complex leaf", () => {
      const minHeap = new MinHeap();
      minHeap.add(1);
      minHeap.add(4);
      minHeap.add(55);
      minHeap.add(5);
      minHeap.add(6);
      minHeap.add(106);
      minHeap.add(83);
      minHeap.add(7);

      minHeap.removeAll(83);

      expect(minHeap.container).toEqual([1, 4, 7, 5, 6, 106, 55]);
    });

    test("when removing a more complex mid-level node", () => {
      const minHeap = new MinHeap();
      minHeap.add(1);
      minHeap.add(55);
      minHeap.add(2);
      minHeap.add(106);
      minHeap.add(83);
      minHeap.add(4);
      minHeap.add(3);
      minHeap.add(205);
      minHeap.add(107);
      minHeap.add(85);
      minHeap.add(93);
      minHeap.add(5);
      minHeap.add(6);
      minHeap.add(4);
      minHeap.add(5);

      minHeap.removeAll(2);

      expect(minHeap.container).toEqual([
        1, 55, 3, 106, 83, 4, 4, 205, 107, 85, 93, 5, 6, 5,
      ]);
    });

    test("when removing root", () => {
      const minHeap = new MinHeap();
      minHeap.add(1);
      minHeap.add(55);
      minHeap.add(2);
      minHeap.add(106);
      minHeap.add(83);
      minHeap.add(4);
      minHeap.add(3);
      minHeap.add(205);
      minHeap.add(107);
      minHeap.add(85);
      minHeap.add(93);
      minHeap.add(5);
      minHeap.add(6);
      minHeap.add(4);
      minHeap.add(5);

      minHeap.removeAll(1);

      expect(minHeap.container).toEqual([
        2, 55, 3, 106, 83, 4, 4, 205, 107, 85, 93, 5, 6, 5,
      ]);
    });
  });
});
