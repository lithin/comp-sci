import { Stack } from "./stack";

// Stack is implemented with linked list under the hood

describe("stack", () => {
  test("initialises empty", () => {
    const stack = new Stack();
    expect(stack.s.head).toBe(null);
    expect(stack.s.tail).toBe(null);
  });

  describe("push", () => {
    it("adds a single item into an empty list", () => {
      const stack = new Stack();
      stack.push("First");
      expect(stack.s.head.value).toBe("First");
      expect(stack.s.tail.value).toBe("First");
    });

    // it's beginning because the "end" of our stack is at the beginning of the linked list!
    it("subsequent items are added to the beginning of the list", () => {
      const stack = new Stack();
      stack.push("First");
      stack.push("Second");
      stack.push("Third");
      expect(stack.s.head.value).toBe("Third");
      expect(stack.s.tail.value).toBe("First");
    });
  });

  describe("pop", () => {
    it("returns ", () => {
      const stack = new Stack();
      stack.push("First");
      stack.push("Second");
      stack.push("Third");
      stack.push("Fourth");

      const item = stack.pop();
      expect(item).toBe("Fourth");
      expect(stack.s.head.value).toBe("Third");
      expect(stack.s.tail.value).toBe("First");
    });

    it("removes the only item in a single-item list", () => {
      const stack = new Stack();
      stack.push("First");

      const item = stack.pop();
      expect(item).toBe("First");
      expect(stack.s.head).toBe(null);
      expect(stack.s.tail).toBe(null);
    });

    it("returns undefined when the list is empty", () => {
      const stack = new Stack();

      const item = stack.pop();
      expect(item).toBe(undefined);
      expect(stack.s.head).toBe(null);
      expect(stack.s.tail).toBe(null);
    });
  });
});
