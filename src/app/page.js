'use client'
import React, { useState } from 'react';
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

  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <Header
        undone={undone.length}
        done={done.length}
        showAdd={showAdd}
        setShowAdd={setShowAdd}
      />
      {showAdd && <AddTodo onAdd={addTodo} onCancel={() => setShowAdd(false)} />}
      <SearchBar search={search} setSearch={setSearch} />

      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        toggleExpand={toggleExpand}
        deleteTodo={deleteTodo}
      />  

      <footer className="w-full max-w-2xl text-center text-gray-400 text-sm mt-10 border-t pt-6">
        React + TailwindCSS 待办清单
      </footer>
    </div>
  );
}