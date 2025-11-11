import { useState, useCallback } from 'react';

export default function useDragSort(setTodos) {
  const [draggedItemId, setDraggedItemId] = useState(null);

  const handleDragStart = useCallback((id) => {
    setDraggedItemId(id);
  }, []);

  const handleDragEnter = useCallback((targetId) => {
    if (draggedItemId === null || draggedItemId === targetId) return;

    setTodos((prevTodos) => {
      const sourceIndex = prevTodos.findIndex(t => t.id === draggedItemId);
      const targetIndex = prevTodos.findIndex(t => t.id === targetId);
      
      if (sourceIndex === -1 || targetIndex === -1) return prevTodos;
      
      const draggedItem = prevTodos[sourceIndex];
      const targetItem = prevTodos[targetIndex];

      // 防止跨完成状态拖拽
      if (draggedItem.done !== targetItem.done) {
        return prevTodos;
      }
      
      // 执行交换
      const newTodos = [...prevTodos];
      const [itemToMove] = newTodos.splice(sourceIndex, 1);
      newTodos.splice(targetIndex, 0, itemToMove);
      
      return newTodos;
    });
  }, [draggedItemId, setTodos]);

  const handleDragEnd = useCallback(() => {
    setDraggedItemId(null);
  }, []);

  return {
    draggedItemId,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  };
}