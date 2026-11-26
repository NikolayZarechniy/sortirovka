import heapq
def prim(graph, start):
    visited = {start}
    mst_edges = []
    total_weight = 0
    
    heap = []
    for neighbor, weight in graph.get(start, []):
        heapq.heappush(heap, (weight, start, neighbor))
    
    all_nodes = set(graph.keys())
    for node in graph:
        for neighbor, _ in graph[node]:
            all_nodes.add(neighbor)
            
    while heap:
        weight, u, v = heapq.heappop(heap)
        
        if v in visited:
            continue
            
        visited.add(v)
        mst_edges.append((u, v, weight))
        total_weight += weight
        
        for neighbor, w in graph.get(v, []):
            if neighbor not in visited:
                heapq.heappush(heap, (w, v, neighbor))
                
    is_connected = len(visited) == len(all_nodes)
    
    return mst_edges, total_weight, is_connected


#Пример
graph = {
    'A': [('C', 2), ('B', 4)],
    'B': [('A', 4), ('C', 1), ('D', 5)],
    'C': [('A', 2), ('B', 1), ('D', 8)],
    'D': [('B', 5), ('C', 8), ('E', 2)],
    'E': [('D', 2)]
}

start_node = 'A'
edges, total_w, connected = prim(graph, start_node)

print(f"Граф связный: {connected}")
print(f"Итоговый вес: {total_w}, количество рёбер: {len(edges)}")
print("Порядок добавления рёбер:")
for u, v, w in edges:
    print(f"{u}{v}={w}", end=", ")
