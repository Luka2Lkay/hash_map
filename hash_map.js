const resize = (bucket, hashKey) => {
  let newBuckets = new Array(bucket.length * 2);

  for (let i = 0; i < bucket.length; i++) {
    if (bucket) {
      bucket.forEach(([key, value]) => {
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
    const loadFactor = this.numberOfEntries / this.buckets.length;
    console.log(loadFactor);

    if(loadFactor > 0.75) {
      resize(this.buckets, index);
    }

    console.log(loadFactor);

    if (index < 0 || index >= this.buckets.length)
      throw new Error("The index is out of bound");

    if (this.buckets[index]) {
      this.buckets[index].push([key, value]);
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

    return this.buckets[index].find((x) => x[0] === key)[1];
  };
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
newHash.set('moon', 'silver')


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

