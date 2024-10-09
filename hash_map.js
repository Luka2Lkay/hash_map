
class HashMap {
  constructor() {
    this.bucketsSize = 16;
    this.buckets = new Array(this.bucketsSize);
    for (let i = 0; i < this.bucketsSize; i++) this.buckets[i] = {};
    this.numberOfEntries = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * key.charCodeAt(i) + hashCode) % this.bucketsSize;
    }
    return hashCode;
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




  















  get = (key) => {
    const index = this.hash(key);

    if (!this.buckets[index]) return null;

    // return this.buckets[index].find((x) => x[0] === key)[1];
    return this.buckets[index];
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
