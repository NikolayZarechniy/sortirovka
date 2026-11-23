function heapify(arr) {
  const size = arr.length;

  function shiftDown(i, n) {
    while (2 * i + 1 < n) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let largest = i;

      if (left < n && arr[left] > arr[largest]) largest = left;
      if (right < n && arr[right] > arr[largest]) largest = right;

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        i = largest;
      } else {
        break;
      }
    }
  }

  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    shiftDown(i, size);
  }

  return arr;
}