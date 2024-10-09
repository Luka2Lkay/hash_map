// const resize = (bucket, hashKey) => {
//   const newBuckets = new Array(bucket.length * 2);

const { contentType } = require("express/lib/response");

//   for (let i = 0; i < bucket.length; i++) {
//     if (bucket) {
//       bucket.forEach(([key, value]) => {
//         const index = hashKey;
//         newBuckets[index] = value;
//       });
//     }
//   }
//   bucket = newBuckets;
// };

// class HashMap {
//   constructor() {
//     this.bucketsSize = 16;
//     this.buckets = new Array(this.length);
//     this.numberOfEntries = 0;
//   }

//   hash(key) {
//     let hashCode = 0;
//     const primeNumber = 31;

//     for (let i = 0; i < key.length; i++) {
//       hashCode = (primeNumber * key.charCodeAt(i) + hashCode) % this.bucketsSize;
//     }
//     return hashCode;
//   }

//   set = (key, value) => {
//     this.numberOfEntries++;
//     const index = this.hash(key);
//     const loadFactor = this.numberOfEntries / this.bucketsSize;
//     console.log(loadFactor);

//     if (index < 0 || index >= this.bucketSize)
//       throw new Error("The index is out of bound");

//     if (this.buckets[index]) {
//       this.buckets[index].push([key, value]);
//       for (let i = 0; i < this.buckets[index].length; i++) {
//         if (this.buckets[index][0][0] === key) {
//           this.buckets[index][0][1] = value;
//         }
//       }
//     } else {
//       this.buckets[index] = [[key, value]];
//     }

//     console.log(loadFactor)

//     if ( this.numberOfEntries / this.bucketsSize > 0.75) {
//       this.resize();
//     }

//     console.log(loadFactor)
  
//   };

//   resize = () => {
//     const newBucketsSize = this.bucketsSize * 2;
//     const newBuckets = new Array(newBucketsSize);
// let newIndex;
//     for (let i = 0; i < this.bucketsSize; i++) {
//       if (this.buckets[i]) {
//         this.buckets[i].forEach(([key, value]) => {
//           newIndex = this.hash(key) % newBucketsSize;
        
//           if (!newBuckets[newIndex]) {
//             newBuckets[newIndex] = [];
//           }
//           newBuckets[newIndex] = value; 

//           console.log(newBuckets[newIndex])
          
//         })
//         // for (let j = 0; j < this.buckets[i].length; j++) {
//         //   const [key, value] = this.buckets[i][j];
//         //   const newIndex = this.hash(key) % newBucketsSize;

     

//         //   newBuckets[newIndex].push([key, value]);
//         // }
//       }
//     }
//     this.bucketsSize = newBucketsSize;
//     this.buckets = newBuckets;
//   };

//   get = (key) => {
//     const index = this.hash(key);

//     if (!this.buckets[index]) return null;

//     // return this.buckets[index].find((x) => x[0] === key)[1];
//     return this.buckets[index]
//   };
// }

class HashMap {
  constructor() {
    this.capacity = 16; // Initial capacity
    this.size = 0;
    this.data = new Array(this.capacity);
  }

  // hash(key) {
  //   // Simple hash function for demonstration
  //   let hash = 0;
  //   for (let i = 0; i < key.length; i++) {
  //     hash += key.charCodeAt(i);
  //   }
  //   return hash % this.capacity;
  // }

    hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * key.charCodeAt(i) + hashCode) % this.data.length;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
//     if (!this.data[index])   
//  {
//       this.data[index] = [];
//     }

    if(this.data[index]) {
      console.log(key)
      this.data[index].push([key, value]);
    } else {
      this.data[index] = [[key, value]]
      console.log(this.data[index]);
    }
    
    this.size++;

    console.log(this.size / this.capacity)
    if (this.size / this.capacity > 0.75) { // Load factor threshold
      this.resize();
    }

    console.log(this.size / this.capacity)
  }

  get(key) {
    const index = this.hash(key);
    // if (!this.data[index]) {
    //   return undefined;
    // }
  
    // for (let i = 0; i < this.data[index].length; i++) {
    //   if (this.data[index][i][0] === key) {
    //     console.log(key)
    //     console.log(this.data[index][i])
    //     return this.data[index][i][1];   

    //   }
    // }
    // return undefined;
    return this.data[index];
  }

  resize() {
    const newCapacity = this.capacity * 2;
    const newData = new Array(newCapacity);
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        for (let j = 0; j < this.data[i].length; j++) {
          const [key, value] = this.data[i][j];
          const newIndex = this.hash(key) % newCapacity;
          if (!newData[newIndex]) {
            newData[newIndex] = [];
          }
          newData[newIndex].push([key, value]);
        }
      }
    }
    this.capacity = newCapacity;
    this.data = newData;
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
// newHash.set("moon", "silver");

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
// console.log(newHash.get("moon"));
