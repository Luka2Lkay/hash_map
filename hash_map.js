const defaultConfig = {
  hashMapSize: 16,
  loadFactor: 0.75,
};
class HashMap {
  #_buckets;
  constructor(config) {
    Object.entries({ ...defaultConfig, ...config }).forEach(([key, value]) => {
      this[key] = value;
    });

    // this.bucketsSize = 16;
    this.#_buckets = new Array(this.hashMapSize);
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
  #findAvailableCodeForKey(key) {
    let hashCode = this.hash(key);
    if (
      this.#_buckets[hashCode] === undefined ||
      this.#_buckets[hashCode].key === key
    ) {
      return hashCode;
    } else {
      // Fixed collision
      let jumpStep = 1;
      while (jumpStep <= this.#_buckets.length) {
        const newHashCode = (hashCode + jumpStep) % this.#_buckets.length;
        if (
          this.#_buckets[newHashCode] === undefined ||
          this.#_buckets[newHashCode].key === key
        ) {
          return newHashCode;
        }
        jumpStep++;
      }
      return -1;
    }
  }

  currentCapacity() {
    return (
      this.#_buckets.filter((obj) => obj !== undefined).length /
      this.#_buckets.length
    );
  }

  #expandBuckets() {
    const oldArr = this.#_buckets.slice();
    const newSize = oldArr.length * 2;
    const newArr = new Array(newSize);
    this.#_buckets = newArr;
    oldArr.forEach((item) => {
      if (item !== undefined) {
        const hashCode = this.#findAvailableCodeForKey(item.key);
        this.#_buckets[hashCode] = { key: item.key, value: item.value };
      }
    });
  }

  set(key, value) {
    const hashCode = this.#findAvailableCodeForKey(key);
    this.#_buckets[hashCode] = { key, value };
    this.numberOfEntries++;
    console.log(this.currentCapacity());
    if (this.currentCapacity() > this.loadFactor) {
      this.#expandBuckets();
    }
    console.log(this.currentCapacity())
  }

  // set = (key, value) => {
  //   this.numberOfEntries++;
  //   const index = this.hash(key);

  //   if (index < 0 || index >= this.bucketsSize)
  //     throw new Error("The index is out of bound");

  //   if (this.buckets[index]) {
  //     this.buckets[index].push([key, value]);
  //     for (let i = 0; i < this.buckets[index].length; i++) {
  //       if (this.buckets[index][0][0] === key) {
  //         this.buckets[index][0][1] = value;
  //       }
  //     }
  //   } else {
  //     this.buckets[index] = [[key, value]];
  //   }

  //   console.log(this.numberOfEntries / this.bucketsSize);

  //   if (this.numberOfEntries / this.bucketsSize > 0.75) {
  //     this.resize();
     
  //   }
  //   console.log(this.numberOfEntries / this.bucketsSize);
  // };




  






  get(key) {
    const hashCode = this.#findAvailableCodeForKey(key);
    if (hashCode === -1 || this.#_buckets[hashCode] === undefined) {
      return null;
    }
    return this.#_buckets[hashCode];
  }

  // get = (key) => {
  //   const index = this.hash(key);

  //   if (!this.#_buckets[index]) return null;

  //   // return this.buckets[index].find((x) => x[0] === key)[1];
  //   return this.#_buckets[index];
  // };
}















const newHash = new HashMap(defaultConfig);

console.log(newHash)
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
