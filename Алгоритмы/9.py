class DoubleHashTable:
    def __init__(self, size):
        self.size = size 
        self.keys = [None] * size
        self.values = [None] * size
        self.count = 0

    def _h1(self, key):
        return key % self.size

    def _h2(self, key):
        return 1 + (key % (self.size - 1))

    def insert(self, key, value):
        if self.count >= self.size:
            raise Exception("Хеш-таблица переполнена")
        
        i = 0
        while i < self.size:
            idx = (self._h1(key) + i * self._h2(key)) % self.size
            if self.keys[idx] is None or self.keys[idx] == key:
                self.keys[idx] = key
                self.values[idx] = value
                self.count += 1
                return
            i += 1

    def search(self, key):
        i = 0
        while i < self.size:
            idx = (self._h1(key) + i * self._h2(key)) % self.size
            if self.keys[idx] is None:
                return None
            if self.keys[idx] == key:
                return self.values[idx]
            i += 1
            
        return None
