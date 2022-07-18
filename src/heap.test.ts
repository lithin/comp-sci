import { Heap } from "./heap";

describe("heap", () => {
  test("is initialised as an empty array", () => {
    const heap = new Heap();
    expect(heap.container).toEqual([]);
  });
});
