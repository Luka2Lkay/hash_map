class HashMap {
  constructor() {
    this.buckets = new Array(16).fill();
    this.size = 0;
    this.loadFactor = 0.75;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * key.charCodeAt(i) + hashCode) % this.buckets.length;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key)
    let bucket = this.buckets[index]
   

    if(index < 0 || index >= this.buckets.length) throw new Error("The index is out of bound")

    if(!bucket) {
        bucket = []
    } 


    for(let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] == key){
            bucket[i][1] == value;
            return
        } 
    }

    bucket.push([key, value])
    this.size++

    if(this.size / this.buckets.length >= this.loadFactor) 
    return this.buckets
  }
}

const newHash = new HashMap()

console.log(newHash.set('luka', 'lukas'))