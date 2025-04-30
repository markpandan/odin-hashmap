import LinkedList from "./linked-list.js";

class Hashmap {
  constructor(loadFactor, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;

    this.buckets = new Array(this.capacity);
    this.count = 0;
  }

  #expand() {
    this.capacity *= 2;

    const oldBuckets = this.buckets;
    this.buckets = new Array(this.capacity);

    for (const bucket of oldBuckets) {
      if (!bucket) continue;

      const node = bucket.at(0);
      this.set(node.key, node.value);
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    // Increases array capacity if it reaches the load factor for the capacity set
    if (this.count >= Math.round(this.loadFactor * this.capacity))
      this.#expand();

    const index = this.hash(key);

    // Instruction mentioned that we need replace the existing value inside of the bucket.
    if (!this.buckets[index]) this.buckets[index] = new LinkedList();
    else this.buckets[index].pop();

    this.buckets[index].append(key, value);
    this.count++;
  }

  get(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index]) console.log(this.buckets[index].at(0).value);
    else console.log("null");
  }

  has(key) {
    const index = this.hash(key);

    return Boolean(this.buckets[index]);
  }

  remove(key) {
    const index = this.hash(key);

    this.buckets[index] = null;
  }

  length() {
    return this.buckets.length;
  }

  clear() {
    for (let i = 0; i >= this.buckets.length; i++) this.buckets[i] = null;
  }

  keys() {
    let string = `[`;
    for (const bucket of this.buckets) {
      if (!bucket) continue;
      string += ` ${bucket.at(0).key},`;
    }

    string = string.substring(0, string.length - 1);
    string += ` ]`;

    console.log(string);
  }

  values() {
    let string = `[`;
    for (const bucket of this.buckets) {
      if (!bucket) continue;
      string += ` ${bucket.at(0).value},`;
    }

    string = string.substring(0, string.length - 1);
    string += ` ]`;

    console.log(string);
  }

  entries() {
    let string = `[`;
    for (const bucket of this.buckets) {
      if (!bucket) continue;
      string += ` [${bucket.at(0).key}, ${bucket.at(0).value}],`;
    }

    string = string.substring(0, string.length - 1);
    string += ` ]`;

    console.log(string);
  }
}

const test = new Hashmap(0.75);
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");
test.set("mango", "strawberry");

test.get("lion");
test.get("grape");
