import React, { useState } from "react";

export default function TodoItem({ 
  todo, 
  toggleTodo, 
  toggleExpand, 
  deleteTodo, 
  setShowAdd, 
  setEditTodo,
  // 拖拽相关 props
  isDragging,
  onDragStart,
  onDragEnter,
  onDragEnd 
}) {
  const [showActions, setShowActions] = useState(false);
  
  const handleEdit = () => {
    setEditTodo(todo);
    setShowAdd(true);
  };
  
  return (
    <div
      // 拖拽属性
      draggable={true}
      onDragStart={() => onDragStart(todo.id)}
      onDragEnter={(e) => { e.preventDefault(); onDragEnter(todo.id); }}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={onDragEnd}
      onDrop={(e) => e.preventDefault()} // 空实现，当前无drop需求
      
      className={`${todo.color} rounded-lg shadow-sm hover:shadow-md transition cursor-pointer 
        ${isDragging ? 'opacity-30 border-2 border-blue-500' : ''}`}
      
      onMouseLeave={() => setShowActions(false)}
      onClick={() => toggleExpand(todo.id)} // 统一：所有项支持展开查看描述
    >
      <div className="flex items-center justify-between p-4 relative">
        {/* 左侧标题 */}
        <div className={`flex items-center gap-3 ${todo.done ? "opacity-50" : "opacity-100"}`}>
          <span className={`text-gray-800 text-base font-medium wrap-break-words ${todo.done ? "line-through text-gray-500" : ""}`}>
            {todo.title}
          </span>
        </div>

        {/* 右侧操作区 */}
        <div
          className="absolute top-0 right-0 h-full flex items-center justify-end p-4 transition-all duration-300 pointer-events-auto"
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          {/* 遮罩层 */}
          <div
            className={`absolute top-0 right-0 h-full w-full bg-white bg-opacity-10 rounded-r-lg backdrop-blur-sm transition-all duration-300 ${showActions ? "opacity-40" : "opacity-0"}`}
          ></div>

          {/* 操作按钮 */}
          <div
            className={`relative flex items-center gap-4 transform transition-all duration-300 ${showActions ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {!todo.done ? (
              <>
                <button onClick={() => toggleTodo(todo.id)} className="text-green-600 text-sm font-medium hover:text-green-700 px-2 py-1 rounded">完成</button>
                <button onClick={handleEdit} className="text-blue-600 text-sm font-medium hover:text-blue-700 px-2 py-1 rounded">修改</button>
                <button onClick={() => deleteTodo(todo.id)} className="text-red-500 text-sm font-medium hover:text-red-600 px-2 py-1 rounded">删除</button>
              </>
            ) : (
              <>
                <button onClick={() => toggleTodo(todo.id)} className="text-blue-600 text-sm font-medium hover:text-blue-700 px-2 py-1 rounded">恢复</button>
                <button onClick={handleEdit} className="text-blue-600 text-sm font-medium hover:text-blue-700 px-2 py-1 rounded">修改</button>             
                <button onClick={() => deleteTodo(todo.id)} className="text-red-500 text-sm font-medium hover:text-red-600 px-2 py-1 rounded">删除</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 描述区：支持换行/空格（white-space: pre-wrap） */}
      {todo.expanded && todo.desc && (
        <div className={`px-12 pb-4 text-sm ${todo.done ? "text-gray-500 line-through" : "text-gray-600"} whitespace-pre-wrap break-words`}>
          {todo.desc}
        </div>
      )}
    </div>
  );
}