import React from 'react';
import TodoItem from './TodoItem';
import useDragSort from '@/hooks/useDragSort';

export default function TodoList({ todos, toggleTodo, toggleExpand, deleteTodo, setShowAdd, setEditTodo, setTodos }) {
  const { draggedItemId, handleDragStart, handleDragEnter, handleDragEnd } = useDragSort(setTodos);

  const undone = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  return (
    <div className="w-full max-w-2xl px-6 space-y-3 pb-10">
      
      {/* 待完成列表：传入拖动处理函数 */}
      {undone.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          toggleExpand={toggleExpand}
          deleteTodo={deleteTodo}
          setShowAdd={setShowAdd}
          setEditTodo={setEditTodo}
          // 拖动相关 props
          isDragging={draggedItemId === todo.id}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragEnd={handleDragEnd}
        />
      ))}

      {done.length > 0 && (
        <div className="relative text-center my-6">
          <div className="border-t border-gray-300"></div>
          <span className="absolute left-1/2 transform -translate-x-1/2 -top-2 bg-gray-50 px-2 text-gray-500 text-sm">
            已完成
          </span>
        </div>
      )}

      {/* 已完成列表：也传入拖动处理函数 */}
      {done.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          toggleExpand={toggleExpand}
          deleteTodo={deleteTodo}
          setShowAdd={setShowAdd}
          setEditTodo={setEditTodo}
          // 拖动相关 props
          isDragging={draggedItemId === todo.id}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragEnd={handleDragEnd}
        />
      ))}

      {todos.length === 0 && (
        <p className="text-gray-400 text-center py-10">未找到匹配的待办事项</p>
      )}
    </div>
  );
}