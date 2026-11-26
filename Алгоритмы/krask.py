class DSU:
    def __init__(self, vertices):
        self.parent = {v: v for v in vertices}
        self.rank = {v: 0 for v in vertices}

    def find(self, vertex):
        if self.parent[vertex] != vertex:
            self.parent[vertex] = self.find(self.parent[vertex])
        return self.parent[vertex]

    def union(self, u, v):
        root_u = self.find(u)
        root_v = self.find(v)

        if root_u != root_v:
            if self.rank[root_u] < self.rank[root_v]:
                self.parent[root_u] = root_v
            elif self.rank[root_u] > self.rank[root_v]:
                self.parent[root_v] = root_u
            else:
                self.parent[root_v] = root_u
                self.rank[root_u] += 1
            return True  
        return False     

def kruskal(graph):
    vertices = graph['vertices']
    edges = graph['edges'] 

    edges.sort(key=lambda x: x[2])

    dsu = DSU(vertices)
    mst_edges = []
    total_weight = 0

    for u, v, weight in edges:
        if dsu.union(u, v):
            mst_edges.append((u, v, weight))
            total_weight += weight
        else:
            print(f"Ребро {u}-{v}={weight} пропускается из-за цикла.")

    roots = set(dsu.find(v) for v in vertices)
    is_connected = len(roots) == 1

    return {
        "mst_edges": mst_edges,
        "total_weight": total_weight,
        "is_connected": is_connected
    }
