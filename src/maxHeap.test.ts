import { MaxHeap } from "./maxHeap";

describe("min heap - children are greater or equal to parent", () => {
  describe("add", () => {
    test("keeps the right order", () => {
      const maxHeap = new MaxHeap();
      maxHeap.add(3);
      maxHeap.add(1);
      maxHeap.add(44);
      maxHeap.add(4);
      maxHeap.add(1);
      maxHeap.add(3);
      maxHeap.add(85);
      maxHeap.add(2);
      maxHeap.add(6);
      maxHeap.add(4);
      maxHeap.add(8);
      maxHeap.add(2);

      expect(maxHeap.container).toEqual([85, 8, 44, 4, 6, 3, 3, 1, 2, 1, 4, 2]);
    });
  });

  describe("remove keeps the right order", () => {
    test("when removing an easy leaf", () => {
      const maxHeap = new MaxHeap();
      maxHeap.add(44);
      maxHeap.add(3);
      maxHeap.add(2);

      maxHeap.removeAll(2);

      expect(maxHeap.container).toEqual([44, 3]);
    });

    test("when removing a more complex leaf", () => {
      const maxHeap = new MaxHeap();
      maxHeap.add(10);
      maxHeap.add(5);
      maxHeap.add(8);
      maxHeap.add(3);
      maxHeap.add(4);
      maxHeap.add(6);

      maxHeap.removeAll(3);

      expect(maxHeap.container).toEqual([10, 6, 8, 5, 4]);
    });

    test("when removing a more complex mid-level node", () => {
      const maxHeap = new MaxHeap();
      maxHeap.add(3);
      maxHeap.add(1);
      maxHeap.add(44);
      maxHeap.add(4);
      maxHeap.add(1);
      maxHeap.add(3);
      maxHeap.add(85);
      maxHeap.add(2);
      maxHeap.add(6);
      maxHeap.add(4);
      maxHeap.add(8);
      maxHeap.add(2);

      maxHeap.removeAll(8);

      expect(maxHeap.container).toEqual([85, 6, 44, 4, 4, 3, 3, 1, 2, 1, 2]);
    });

    test("when removing root", () => {
      const maxHeap = new MaxHeap();
      maxHeap.add(3);
      maxHeap.add(1);
      maxHeap.add(44);
      maxHeap.add(4);
      maxHeap.add(1);
      maxHeap.add(3);
      maxHeap.add(85);
      maxHeap.add(2);
      maxHeap.add(6);
      maxHeap.add(4);
      maxHeap.add(8);
      maxHeap.add(2);

      maxHeap.removeAll(85);

      expect(maxHeap.container).toEqual([44, 8, 3, 4, 6, 3, 2, 1, 2, 1, 4]);
    });
  });
});
