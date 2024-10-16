class HashMap {
  constructor() {
    this.hashMapSize = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.hashMapSize);
    this.numberOfEntries = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * key.charCodeAt(i) + hashCode) % this.hashMapSize;
    }
    return hashCode;
  }

  #findAvailableIndex(key) {
    let index = this.hash(key);

    if (!this.buckets[index] || this.buckets[index].key === key) {
      return index;
    } else {
      let skipStep = 1;
      while (skipStep <= this.buckets.length) {
        const newIndex = (index + skipStep) % this.buckets.length;
        if (!this.buckets[newIndex] || this.buckets[newIndex].key === key) {
          return newIndex;
        }
        skipStep++;
      }
      return -1;
    }
  }

  #currentCapacity() {
    const occupiedBuckets = this.buckets.filter((obj) => obj !== undefined);
    return occupiedBuckets.length / this.buckets.length;
  }

  #resize() {
    const initialBuckets = this.buckets;
    const newHashMapSize = this.hashMapSize * 2;
    const newBuckets = new Array(newHashMapSize);
    this.buckets = newBuckets;
    initialBuckets.forEach((item) => {
      if (item !== undefined) {
        const index = this.#findAvailableIndex(item.key);
        this.buckets[index] = { key: item.key, value: item.value };
      }
    });
  }

  set(key, value) {
    const index = this.#findAvailableIndex(key);
    this.buckets[index] = { key, value };
    this.numberOfEntries++;
    if (this.#currentCapacity() > this.loadFactor) {
      this.#resize();
    }
  }

  get(key) {
    const index = this.#findAvailableIndex(key);

    if (index === -1 || !this.buckets[index]) {
      return null;
    }

    return this.buckets[index].value;
  }

  has(key) {
    const index = this.#findAvailableIndex(key);

    if (index === -1 || !this.buckets[index]) {
      return false;
    }
    return this.buckets[index].key === key;
  }

  remove(key) {
    const index = this.#findAvailableIndex(key);

    if (!this.has(key)) {
      return false;
    }

    this.buckets[index] = undefined;
    this.numberOfEntries--;
    return true;
  }

  length() {
    return this.numberOfEntries;
  }

  clear() {
    this.numberOfEntries = 0;
    return (this.buckets = new Array(this.hashMapSize));
  }

  keys() {
    const filterdBuckets = this.buckets.filter((item) => {
      return item !== undefined;
    });

    return filterdBuckets.map((bucket) => {
      return bucket.key;
    });
  }
}

const newHash = new HashMap();

newHash.set("apple", "red");
newHash.set("banana", "yellow");
newHash.set("carrot", "orange");
newHash.set("dog", "brown");
newHash.set("elephant", "gray");
newHash.set("frog", "green");
newHash.set("grape", "purple");
newHash.set("hat", "black");
newHash.set("ice cream", "white");
newHash.set("jacket", "blue");
newHash.set("kite", "pink");
newHash.set("lion", "golden");
newHash.set("moon", "silver");

console.log(newHash.remove("banana"));
console.log(newHash.remove("carrot"));
console.log(newHash.remove("apple"));

console.log(newHash.has("apple"));
console.log(newHash.has("banana"));
console.log(newHash.has("carrot"));
console.log(newHash.has("car"));

console.log(newHash.length());
console.log(newHash.keys());
// newHash.clear();
// console.log(newHash.length())

console.log(newHash.get("apple"));
console.log(newHash.get("banana"));
console.log(newHash.get("carrot"));
console.log(newHash.get("dog"));
console.log(newHash.get("elephant"));
console.log(newHash.get("frog"));
console.log(newHash.get("grape"));
console.log(newHash.get("hat"));
console.log(newHash.get("ice cream"));
console.log(newHash.get("jacket"));
console.log(newHash.get("kite"));
console.log(newHash.get("lion"));
console.log(newHash.get("moon"));
