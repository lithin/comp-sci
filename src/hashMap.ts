import { LinkedList } from "./linkedList";

interface HashMapValue {
  key: string;
  [k: string]: any;
}
export class HashMap {
  public buckets: { [k: number]: LinkedList<HashMapValue> };
  private numberOfBuckets: number;

  constructor(numberOfBuckets?: number) {
    this.buckets = {};
    this.numberOfBuckets = numberOfBuckets || 32;
  }

  private hash(key: string): number {
    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i) * (17 ^ (key.length - i));
    }

    return hash % this.numberOfBuckets;
  }

  public set(value: HashMapValue) {
    const hash = this.hash(value.key);

    if (!this.buckets[hash]) {
      this.buckets[hash] = new LinkedList<HashMapValue>();
    }

    const item = this.buckets[hash].findBy(
      (item: HashMapValue): boolean => item.key === value.key
    );

    if (item) {
      item.value = value;
    } else {
      this.buckets[hash].append(value);
    }
  }

  public get(key: string) {
    const hash = this.hash(key);
    return this.buckets[hash]?.findBy((item) => key === item.key)?.value;
  }

  public delete(key: string) {
    const hash = this.hash(key);
    return this.buckets[hash]?.deleteBy((item) => key === item.key);
  }
}
