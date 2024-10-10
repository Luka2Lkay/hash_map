class HashMap {
  constructor() {
    this.hashMapSize = 16;
    this.loadFactor = 0.75
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
   
    if (
      !this.buckets[index] ||
      this.buckets[index].key === key
    ) {
      return index;
    } else {
      let skipStep = 1;
      while (skipStep <= this.buckets.length) {
        const newIndex = (index + skipStep) % this.buckets.length;
        if (
          !this.buckets[newIndex] ||
          this.buckets[newIndex].key === key
        ) {
          return newIndex;
        }
        skipStep++;
      }
      return -1;
    }
  }

  currentCapacity() {
    return (
      this.buckets.filter((obj) => obj !== undefined).length /
      this.buckets.length
    );
  }

  #resize() {
    const oldArr = this.buckets.slice();
    const newSize = oldArr.length * 2;
    const newArr = new Array(newSize);
    this.buckets = newArr;
    oldArr.forEach((item) => {
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
    console.log(this.currentCapacity());
    if (this.currentCapacity() > this.loadFactor) {
      this.#resize();
    }
    console.log(this.currentCapacity());
  }

  get(key) {
    const hashCode = this.#findAvailableIndex(key);
    if (hashCode === -1 || this.buckets[hashCode] === undefined) {
      return null;
    }
    return this.buckets[hashCode];
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
