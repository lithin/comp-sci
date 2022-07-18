import { MinHeap } from "./minHeap";
import { PriorityQueue } from "./priorityQueue";

describe("priority queue", () => {
  test("is initialised as a min heap", () => {
    const priorityQueue = new PriorityQueue();
    expect(priorityQueue).toBeInstanceOf(MinHeap);
    expect(priorityQueue.container).toEqual([]);
  });

  describe("add", () => {
    test("adds in correct priority order", () => {
      const priorityQueue = new PriorityQueue();
      priorityQueue.add({ priority: 3, value: "first" });
      priorityQueue.add({ priority: 1, value: "second" });
      priorityQueue.add({ priority: 2, value: "third" });
      priorityQueue.add({ priority: 1, value: "fourth" });
      priorityQueue.add({ priority: 3, value: "fifth" });

      expect(priorityQueue.container).toEqual([
        { priority: 1, value: "second" },
        { priority: 1, value: "fourth" },
        { priority: 2, value: "third" },
        { priority: 3, value: "first" },
        { priority: 3, value: "fifth" },
      ]);
    });
  });

  describe("shift", () => {
    test("removes the top priority item, reshuffling the rest", () => {
      const priorityQueue = new PriorityQueue();
      priorityQueue.add({ priority: 3, value: "first" });
      priorityQueue.add({ priority: 1, value: "second" });
      priorityQueue.add({ priority: 2, value: "third" });
      priorityQueue.add({ priority: 1, value: "fourth" });
      priorityQueue.add({ priority: 3, value: "fifth" });

      const item = priorityQueue.shift();
      expect(item).toEqual({ priority: 1, value: "second" });
      expect(priorityQueue.container).toEqual([
        { priority: 1, value: "fourth" },
        { priority: 3, value: "fifth" },
        { priority: 2, value: "third" },
        { priority: 3, value: "first" },
      ]);

      const secondItem = priorityQueue.shift();
      expect(secondItem).toEqual({ priority: 1, value: "fourth" });
      expect(priorityQueue.container).toEqual([
        { priority: 2, value: "third" },
        { priority: 3, value: "fifth" },
        { priority: 3, value: "first" },
      ]);
    });

    test("does nothing when queue is empty", () => {
      const priorityQueue = new PriorityQueue();
      const secondItem = priorityQueue.shift();
      expect(secondItem).toEqual(undefined);
      expect(priorityQueue.container).toEqual([]);
    });
  });
});
