import React, { useState } from "react";

export default function TodoItem({ todo, toggleTodo, toggleExpand, deleteTodo, setShowAdd, setEditTodo }) {
  const [showActions, setShowActions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({ title: "", desc: "" });

  const handleEdit = () => {
    setEditTodo(todo);  // 将当前 todo 传给父组件
    setShowAdd(true);   // 显示 AddTodo
  };

  const handleSaveEdit = () => {
    // 删除原数据
    deleteTodo(todo.id);
    // 新建新数据
    addTodo({ title: editData.title, desc: editData.desc, color: todo.color });
    setShowModal(false);
  };

  return (
    <div
      className={`${todo.color} rounded-lg shadow-sm hover:shadow-md transition cursor-pointer`}
      onMouseLeave={() => setShowActions(false)}
      onClick={() => { if (!todo.done) toggleExpand(todo.id); }}
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

      {/* 描述区 */}
      {todo.expanded && todo.desc && (
        <div className={`px-12 pb-4 text-sm ${todo.done ? "text-gray-500 line-through" : "text-gray-600"}`}>
          {todo.desc}
        </div>
      )}

      {/* 编辑弹窗 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-medium mb-4">修改待办</h3>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              placeholder="标题"
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              value={editData.desc}
              onChange={(e) => setEditData({ ...editData, desc: e.target.value })}
              placeholder="描述"
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300">取消</button>
              <button onClick={handleSaveEdit} className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
