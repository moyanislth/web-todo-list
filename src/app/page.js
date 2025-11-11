'use client'
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import AddTodo from '@/components/AddTodo';
import SearchBar from '@/components/SearchBar';
import TodoList from '@/components/TodoList';
import useTodos from '@/hooks/useTodos';

export default function TodoPage() {
  const {
    filteredTodos,
    undone,
    done,
    search,
    setSearch,
    toggleTodo,
    toggleExpand,
    addTodo,
    deleteTodo,
  } = useTodos();

  const [showAdd, setShowAdd] = useState(false);    // 是否显示弹窗
  const [editTodo, setEditTodo] = useState(null);

  // 锁定滚动条
  useEffect(() => {
    document.body.style.overflow = showAdd ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showAdd]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">

      <Header
        undone={undone.length}
        done={done.length}
        showAdd={showAdd}
        setShowAdd={setShowAdd}
      />

      {/* 弹窗及遮罩 */}
      <div className={`fixed inset-0 flex justify-center items-start pt-20 z-50 pointer-events-none`}>
        {/* 遮罩层 */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300
            ${showAdd ? 'opacity-40 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setShowAdd(false)}
        ></div>

        {/* 弹窗 */}
        <div
          className={`relative w-full max-w-2xl transform transition-all duration-300
            ${showAdd ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto' : '-translate-y-10 scale-95 opacity-0'}`}
        >
          {showAdd && (
            <AddTodo
              initialTitle={editTodo?.title || ''}
              initialDesc={editTodo?.desc || ''}
              onAdd={(title, desc) => {
                if (!title?.trim()) return;

                if (editTodo) deleteTodo(editTodo.id);

                addTodo(title, desc, editTodo?.color);
                setEditTodo(null);
                setShowAdd(false);
              }}
              onCancel={() => {
                setShowAdd(false);
                setEditTodo(null);
              }}
            />
          )}
        </div>
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        toggleExpand={toggleExpand}
        deleteTodo={deleteTodo}
        setShowAdd={setShowAdd}
        setEditTodo={setEditTodo}
      />

      <footer className="w-full max-w-2xl text-center text-gray-400 text-sm mt-10 border-t pt-6">
        React + TailwindCSS 待办清单
      </footer>
    </div>
  );
}
