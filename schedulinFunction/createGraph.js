function createGraph(edges) {
    const graph = {};
  
    for (let edge of edges) {
      const vertices = edge;
  
      for (let i = 0; i < vertices.length; i++) {
        const vertex = vertices[i];
  
        if (!(vertex in graph)) graph[vertex] = [];
        // Add connections to the subsequent vertices in the edge
        for (let j = i + 1; j < vertices.length; j++) {
          const neighbor = vertices[j];
          
          if (!graph[vertex].includes(neighbor)) {
            graph[vertex].push(neighbor);
          }
  
          if (!(neighbor in graph) || !graph[neighbor].includes(vertex)) {
            if (!(neighbor in graph)) graph[neighbor] = [];
            graph[neighbor].push(vertex);
          }
        }
      }
    }
  
    return graph;
    
  }

//******************************************************************************************** */

export default createGraph;
