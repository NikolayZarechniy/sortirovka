class PriorityQueue:
    def __init__(self):
        self.heap = []

    def _sift_up(self, idx):
        while idx > 0:
            parent = (idx - 1) // 2
            if self.heap[idx] > self.heap[parent]:
                self.heap[idx], self.heap[parent] = self.heap[parent], self.heap[idx]
                idx = parent
            else:
                break

    def _sift_down(self, idx):
        size = len(self.heap)
        while 2 * idx + 1 < size:
            left = 2 * idx + 1
            right = 2 * idx + 2
            largest = idx

            if left < size and self.heap[left] > self.heap[largest]:
                largest = left
            if right < size and self.heap[right] > self.heap[largest]:
                largest = right

            if largest != idx:
                self.heap[idx], self.heap[largest] = self.heap[largest], self.heap[idx]
                idx = largest
            else:
                break

    def insert(self, value):
        self.heap.append(value)
        self._sift_up(len(self.heap) - 1)

    def peek(self):
        if not self.heap:
            raise IndexError("Очередь пуста")
        return self.heap[0]

    def extract(self):
        if not self.heap:
            raise IndexError("Очередь пуста")
        
        root = self.heap[0]
        last = self.heap.pop()
        
        if self.heap:
            self.heap[0] = last
            self._sift_down(0)
            
        return root

    def change_key(self, index, new_value):
        if index < 0 or index >= len(self.heap):
            raise IndexError("Индекс вне диапазона кучи")
        
        old_value = self.heap[index]
        self.heap[index] = new_value
        
        if new_value > old_value:
            self._sift_up(index)
        else:
            self._sift_down(index)


def heapsort(arr):
    def sift_down_arr(arr, size, idx):
        largest = idx
        left = 2 * idx + 1
        right = 2 * idx + 2

        if left < size and arr[left] > arr[largest]:
            largest = left
        if right < size and arr[right] > arr[largest]:
            largest = right

        if largest != idx:
            arr[idx], arr[largest] = arr[largest], arr[idx]
            sift_down_arr(arr, size, largest)

    n = len(arr)
    
    for i in range(n // 2 - 1, -1, -1):
        sift_down_arr(arr, n, i)
        
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        sift_down_arr(arr, i, 0)
        
    return arr
