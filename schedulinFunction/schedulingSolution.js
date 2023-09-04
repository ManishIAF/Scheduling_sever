function graphColoring(graph, availableColors, availableSlots, confSlots) {
    const sortedVertices = Object.keys(graph).sort((a, b) => graph[b].length - graph[a].length);
    const assignedColor = {};
    const assignedSlots = {};
    const usedColors = new Set();
  
    for (const vertex of sortedVertices) {
      const neighbors = graph[vertex];
      usedColors.clear();
      const usedSlots = new Set([...confSlots[vertex]]);
  
  
      for (const neighbor of neighbors) {
        if (assignedColor[neighbor] !== undefined) {
          usedColors.add(assignedColor[neighbor]);
        }
      }
  
      for (const color of availableColors) {
        if (!usedColors.has(color)) {
          assignedColor[vertex] = color;
          break;
        }
      }
  
  
      for (const slot of availableSlots) {
        if (!usedSlots.has(slot) && (!confSlots[vertex] || confSlots[vertex] !== slot)) {
          assignedSlots[vertex] = slot;
          break;
        }
      }
      usedSlots.clear();
      
    }
  
    return { assignedColor, assignedSlots };
  }
  
    function Result(assignedColor, assignedSlots){
      const combinedObject = {};
  
      for (const subject of Object.keys(assignedColor)) {
        const date = assignedColor[subject];
        const slot = assignedSlots[subject];
  
        combinedObject[subject] = { date, slot };
      }
  
      return combinedObject;
    }
    
  export {graphColoring,Result};