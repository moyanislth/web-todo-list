import React, { useState } from 'react';

export default function AddTodo({ onAdd, onCancel }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <div className="w-full max-w-2xl px-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
      <input
        type="text"
        placeholder="标题（必填）"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <textarea
        placeholder="描述（可选）"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
      />
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md text-gray-500 hover:bg-gray-100 transition"
        >
          取消
        </button>
        <button
          onClick={() => {
            onAdd(title, desc);
            setTitle('');
            setDesc('');
          }}
          className="px-4 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-white font-medium transition"
        >
          添加
        </button>
      </div>
    </div>
  );
}
