const resize = (bucket, hashKey) => {
  let newBuckets = new Array(bucket.length * 2);

  for (let i = 0; i < bucket.length; i++) {
    if (bucket) {
      bucket.forEach(([key,value]) => {
        const index = hashKey;
        newBuckets[index] = value;
      });
    }
  }
};

class HashMap {
  constructor() {
    this.buckets = new Array(16);
    this.numberOfEntries = 0;
    this.loadFactor = this.numberOfEntries / this.buckets.length;
  }

  hash(key) {
    let hashCode = 0;
    const bucketSize = this.buckets.length;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * key.charCodeAt(i) + hashCode) % bucketSize;
    }
    return hashCode;
  }

  set = (key, value) => {
    this.numberOfEntries++;
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length)
      throw new Error("The index is out of bound");

    if (this.buckets[index]) {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][0][0] === key) {
          this.buckets[index][0][1] = value;
        }
      }
    } else {
      this.buckets[index] = [[key, value]];
    }
  };

  get = (key) => {
    const index = this.hash(key);

    if (!this.buckets[index]) return null;

    const keyValues = this.buckets[index].filter((x) => x[0] === key);

    return this.buckets[index]
    // return resize(this.buckets[index], index);
  };
}

const newHash = new HashMap();
newHash.set("apple", "red");
newHash.set("banana", "yellow");
newHash.set("banana", "pink");
newHash.set("carrot", "orange");
newHash.set("dog", "brown");
console.log(newHash.get("apple"));
console.log(newHash.get("banana"));
console.log(newHash.get("carrot"))
console.log(newHash.get("dog"))
console.log(newHash.hash("apple"));
