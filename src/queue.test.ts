import { Queue } from "./queue";

// Queue is implemented using linked list under the hood

describe("queue", () => {
  test("initialises with an empty queue", () => {
    const queue = new Queue();
    expect(queue.q.head).toEqual(null);
    expect(queue.q.tail).toEqual(null);
  });

  describe("enqueue", () => {
    it("adds a new element to an empty list", () => {
      const queue = new Queue();
      queue.enqueue(1);
      expect(queue.q.head.value).toEqual(1);
      expect(queue.q.tail.value).toEqual(1);
    });

    it("adds subsequent elements to the end of the queue", () => {
      const queue = new Queue();
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.q.head.value).toEqual(1);
      expect(queue.q.tail.value).toEqual(3);
    });
  });

  describe("dequeue", () => {
    it("removes the only element in a single-item queue", () => {
      const queue = new Queue();
      queue.enqueue(1);
      const item = queue.dequeue();
      expect(item).toEqual(1);
      expect(queue.q.head).toBe(null);
      expect(queue.q.tail).toBe(null);
    });

    it("leaves queue empty when it is empty", () => {
      const queue = new Queue();
      const item = queue.dequeue();
      expect(item).toEqual(undefined);
      expect(queue.q.head).toBe(null);
      expect(queue.q.tail).toBe(null);
    });

    it("removes the first elements from the beginning of a longer queue", () => {
      const queue = new Queue();
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.enqueue(4);
      const item = queue.dequeue();
      expect(item).toEqual(1);
      expect(queue.q.head.value).toBe(2);
      expect(queue.q.tail.value).toBe(4);
    });
  });
});
