'use client'
import { useState } from 'react';

export default function useTodos() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: '示例待办事项',
      desc: '示例描述',
      color: 'bg-green-100',
      done: false,
      expanded: false,
    },
    {
      id: 2,
      title: '另一个待办事项',
      desc: '另一个描述',
      color: 'bg-blue-100',
      done: false,
      expanded: false,
    },
    {
      id: 3,
      title: '已完成的事项',
      desc: '已完成事项的描述',
      color: 'bg-yellow-100',
      done: true,
      expanded: false,
    },
  ]);

  const [search, setSearch] = useState('');

  // 切换完成状态
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev
        .map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done, expanded: false } : todo
        )
        .sort((a, b) => Number(a.done) - Number(b.done))
    );
  };

  // 展开/收起
  const toggleExpand = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, expanded: !todo.expanded } : todo
      )
    );
  };

  // 新增
  const addTodo = (title, desc) => {
    if (!title.trim()) return;
    const colors = ['bg-green-100', 'bg-yellow-100', 'bg-blue-100', 'bg-pink-100'];
    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim(),
      color: colors[Math.floor(Math.random() * colors.length)],
      done: false,
      expanded: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  // 搜索过滤（仅标题）
  const filteredTodos = todos.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  // 删除
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const undone = filteredTodos.filter((t) => !t.done);
  const done = filteredTodos.filter((t) => t.done);

  return {
    todos,
    setTodos,
    search,
    setSearch,
    filteredTodos,
    undone,
    done,
    toggleTodo,
    toggleExpand,
    addTodo,
    deleteTodo,
  };
}
