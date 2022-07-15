import { HashMap } from "./hashMap";

describe("hash map", () => {
  describe("set", () => {
    test("sets a new item when key has not been used before", () => {
      const hashMap = new HashMap();
      hashMap.set({ key: "123-123", name: "John" });
      expect(Object.entries(hashMap.buckets).length).toBe(1);
      expect(Object.values(hashMap.buckets)[0].head.value).toEqual({
        key: "123-123",
        name: "John",
      });
      expect(Object.values(hashMap.buckets)[0].tail.value).toEqual({
        key: "123-123",
        name: "John",
      });
    });

    test("updates item if key already exists", () => {
      const hashMap = new HashMap();
      hashMap.set({ key: "123-123", name: "John" });
      hashMap.set({ key: "123-123", name: "Jasper" });

      expect(Object.entries(hashMap.buckets).length).toBe(1);
      expect(Object.values(hashMap.buckets)[0].head.value).toEqual({
        key: "123-123",
        name: "Jasper",
      });
      expect(Object.values(hashMap.buckets)[0].tail.value).toEqual({
        key: "123-123",
        name: "Jasper",
      });
    });

    test("sets three different items in three different buckets if their hash is different", () => {
      const hashMap = new HashMap();
      hashMap.set({ key: "123-123", name: "John" });
      hashMap.set({ key: "hello", name: "Jasper" });
      hashMap.set({ key: "aha", name: "Mike" });

      expect(Object.entries(hashMap.buckets).length).toBe(3);
      Object.values(hashMap.buckets).forEach((value) => {
        expect([
          { key: "123-123", name: "John" },
          { key: "hello", name: "Jasper" },
          { key: "aha", name: "Mike" },
        ]).toContainEqual(value.head.value);
        expect([
          { key: "123-123", name: "John" },
          { key: "hello", name: "Jasper" },
          { key: "aha", name: "Mike" },
        ]).toContainEqual(value.tail.value);
      });
    });

    test("sets two different items in the same bucket if their hash is the same", () => {
      const hashMap = new HashMap();

      // These two keys happen to have the same hash when using the default number of buckets
      hashMap.set({ key: "yup", name: "Amanda" });
      hashMap.set({ key: "maybe", name: "Malinda" });

      expect(Object.entries(hashMap.buckets).length).toBe(1);
      expect(Object.values(hashMap.buckets)[0].head.value).toEqual({
        key: "yup",
        name: "Amanda",
      });
      expect(Object.values(hashMap.buckets)[0].tail.value).toEqual({
        key: "maybe",
        name: "Malinda",
      });
    });
  });

  describe("get", () => {
    test("gets an item if there is only one in the hash map", () => {
      const hashMap = new HashMap();
      hashMap.set({ key: "yup", name: "Amanda" });

      expect(hashMap.get("yup")).toEqual({ key: "yup", name: "Amanda" });
    });

    test("gets an item if there are two in different buckets", () => {
      const hashMap = new HashMap();
      hashMap.set({ key: "123-123", name: "John" });
      hashMap.set({ key: "hello", name: "Jasper" });

      expect(hashMap.get("123-123")).toEqual({ key: "123-123", name: "John" });
    });

    test("gets an item if there are two in the same bucket", () => {
      const hashMap = new HashMap();

      // These two keys happen to have the same hash when using the default number of buckets
      hashMap.set({ key: "yup", name: "Amanda" });
      hashMap.set({ key: "maybe", name: "Malinda" });

      expect(hashMap.get("yup")).toEqual({ key: "yup", name: "Amanda" });
    });

    test("returns undefined if hash map is empty", () => {
      const hashMap = new HashMap();

      expect(hashMap.get("yup")).toEqual(undefined);
    });

    test("returns undefined if item does not exist in existing bucket", () => {
      const hashMap = new HashMap();

      hashMap.set({ key: "maybe", name: "Malinda" });

      // "yup" has the same hash as "maybe"
      expect(hashMap.get("yup")).toEqual(undefined);
    });

    test("returns undefined if bucket does not exist", () => {
      const hashMap = new HashMap();

      hashMap.set({ key: "maybe", name: "Malinda" });

      // "123-123" has a different hash from "maybe"
      expect(hashMap.get("123-123")).toEqual(undefined);
    });
  });

  describe("delete", () => {
    test("removes item from a bucket with two items", () => {
      const hashMap = new HashMap();

      // These two keys happen to have the same hash when using the default number of buckets
      hashMap.set({ key: "yup", name: "Amanda" });
      hashMap.set({ key: "maybe", name: "Malinda" });

      hashMap.delete("yup");

      expect(Object.entries(hashMap.buckets).length).toBe(1);
      expect(Object.values(hashMap.buckets)[0].head.value).toEqual({
        key: "maybe",
        name: "Malinda",
      });
      expect(Object.values(hashMap.buckets)[0].tail.value).toEqual({
        key: "maybe",
        name: "Malinda",
      });
    });

    test("removes item from a bucket with one item", () => {
      const hashMap = new HashMap();

      hashMap.set({ key: "yup", name: "Amanda" });

      hashMap.delete("yup");

      expect(Object.entries(hashMap.buckets).length).toBe(1);
      expect(Object.values(hashMap.buckets)[0].head).toBe(null);
      expect(Object.values(hashMap.buckets)[0].tail).toBe(null);
    });

    test("removes item from a map when there are several buckets", () => {
      const hashMap = new HashMap();
      hashMap.set({ key: "123-123", name: "John" });
      hashMap.set({ key: "hello", name: "Jasper" });

      hashMap.delete("hello");

      expect(Object.entries(hashMap.buckets).length).toBe(2);
      Object.values(hashMap.buckets).forEach((value) => {
        expect([{ key: "123-123", name: "John" }, null]).toContainEqual(
          value.head?.value || null
        );
        expect([{ key: "123-123", name: "John" }, null]).toContainEqual(
          value.tail?.value || null
        );
      });
    });

    test("does not remove anything if hash map is empty", () => {
      const hashMap = new HashMap();
      hashMap.delete("hello");
      expect(Object.entries(hashMap.buckets).length).toBe(0);
    });

    test("does not remove anything if bucket is empty", () => {
      const hashMap = new HashMap();
      hashMap.set({ key: "hello", name: "Jasper" });

      hashMap.delete("hello");

      expect(Object.entries(hashMap.buckets).length).toBe(1);
      expect(Object.values(hashMap.buckets)[0].head).toBe(null);
      expect(Object.values(hashMap.buckets)[0].tail).toBe(null);

      // now we have an empty bucket; removing the item from there again won't change anything

      hashMap.delete("hello");

      expect(Object.entries(hashMap.buckets).length).toBe(1);
      expect(Object.values(hashMap.buckets)[0].head).toBe(null);
      expect(Object.values(hashMap.buckets)[0].tail).toBe(null);
    });

    test("does not remove anything if item does not exist in map", () => {
      const hashMap = new HashMap();
      hashMap.set({ key: "hello", name: "Jasper" });

      hashMap.delete("123-123");

      // Attempting to remove non-existing item does nothing to existing items
      expect(Object.entries(hashMap.buckets).length).toBe(1);
      expect(Object.values(hashMap.buckets)[0].head.value).toEqual({
        key: "hello",
        name: "Jasper",
      });
      expect(Object.values(hashMap.buckets)[0].tail.value).toEqual({
        key: "hello",
        name: "Jasper",
      });
    });
  });

  describe("bucket number", () => {
    test("can be set", () => {
      const hashMap = new HashMap(1);

      // these two would end up with a different hash value if the default number of buckets (32) was used
      hashMap.set({ key: "123-123", name: "John" });
      hashMap.set({ key: "hello", name: "Jasper" });

      expect(Object.entries(hashMap.buckets).length).toBe(1);
      expect(Object.values(hashMap.buckets)[0].head.value).toEqual({
        key: "123-123",
        name: "John",
      });
      expect(Object.values(hashMap.buckets)[0].tail.value).toEqual({
        key: "hello",
        name: "Jasper",
      });
    });
  });
});
