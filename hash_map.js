class HashMap {
  constructor() {
    this.bucket = new Array(7);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        primeNumber * key.charCodeAt(i) + (hashCode % this.bucket.length);
    }

    return hashCode;
  }
}
