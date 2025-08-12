class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  hash(key) {
    const prime = 31;
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  resize() {
    this.capacity *= 2;
    const newBuckets = new Array(this.capacity).fill(null).map(() => []);

    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        const index = this.hash(key);
        newBuckets[index].push([key, value]);
      }
    }

    this.buckets = newBuckets;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let arr of bucket) {
      if (arr[0] === key) {
        arr[1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let arr of bucket) {
      if (arr[0] === key) {
        console.log(arr[1]);
        return arr[1];
      }
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    console.log(this.size);
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const allKeys = [];
    for (let bucket of this.buckets) {
      for (let [key] of bucket) {
        allKeys.push(key);
      }
    }
    console.log(allKeys);
    return allKeys;
  }

  values() {
    const allValues = [];
    for (let bucket of this.buckets) {
      for (let [, value] of bucket) {
        allValues.push(value);
      }
    }
    console.log(allValues);
    return allValues;
  }

  entries() {
    const allEntries = [];
    for (let bucket of this.buckets) {
      for (let pair of bucket) {
        allEntries.push(pair);
      }
    }
    console.log(allEntries);
    return allEntries;
  }
}

export { HashMap };
