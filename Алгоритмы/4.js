class MaxHeap {
  constructor() {
    this.heap = [];
  }

  shiftUp(index) {
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] > this.heap[parentIndex]) {
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  shiftDown(index, size = this.heap.length) {
    while (2 * index + 1 < size) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let largest = index;

      if (left < size && this.heap[left] > this.heap[largest]) {
        largest = left;
      }
      if (right < size && this.heap[right] > this.heap[largest]) {
        largest = right;
      }

      if (largest !== index) {
        [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
        index = largest;
      } else {
        break;
      }
    }
  }
}
