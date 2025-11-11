'use client'
import { useState, useEffect } from 'react';
import useDataPersistence from './useDataPersistence';

export default function useTodos() {
  const [todos, setTodos] = useState([]); // 初始空：SSR/客户端一致，避免mismatch
  const [isLoading, setIsLoading] = useState(true); // 新增：加载状态

  const [search, setSearch] = useState('');

  // 集成持久化hook（移除todos传参，直接setTodos）
  const { exportTodos, importTodos } = useDataPersistence(setTodos);

  // 客户端加载：localStorage或默认数据（同步+验证，避免覆盖）
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoading(true); // 标记加载中
      try {
        console.log('Loading from localStorage...'); // 调试
        const saved = localStorage.getItem('todos');
        console.log('Raw localStorage "todos":', saved); // 调试：原始内容
        let loadedTodos = [];
        if (saved) {
          const parsed = JSON.parse(saved);
          console.log('Parsed localStorage:', parsed); // 调试：解析后
          if (Array.isArray(parsed) && parsed.length > 0) {
            loadedTodos = parsed;
          }
        }
        // 如果无效/空，fallback默认
        if (loadedTodos.length === 0) {
          console.log('No valid data, loading defaults...'); // 调试
          loadedTodos = [ ];
          localStorage.setItem('todos', JSON.stringify(loadedTodos));
        }
        setTodos(loadedTodos);
        console.log('Loaded todos:', loadedTodos); // 最终状态
      } catch (error) {
        console.error('Failed to load todos from localStorage:', error);
        // Fallback默认（同步）
        const defaultTodos = [ ];
        setTodos(defaultTodos);
        localStorage.setItem('todos', JSON.stringify(defaultTodos));
      } finally {
        setIsLoading(false); // 加载完
      }
    } else {
      setIsLoading(false); // SSR下不加载
    }
  }, []);

  // 保存：todos变时异步存
  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading) {
      try {
        localStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Failed to save todos to localStorage:', error);
      }
    }
  }, [todos, isLoading]);

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
  const addTodo = (title, desc = '', color) => {
    if (!title || typeof title !== 'string' || !title.trim()) return;

    const colors = ['bg-green-100', 'bg-yellow-100', 'bg-blue-100', 'bg-pink-100'];

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      desc: desc || '',
      done: false,
      expanded: false,
      color: color || colors[Math.floor(Math.random() * colors.length)],
    };

    setTodos(prev => [newTodo, ...prev]);
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
    isLoading, // 新增返回加载状态
    search,
    setSearch,
    filteredTodos,
    undone,
    done,
    toggleTodo,
    toggleExpand,
    addTodo,
    deleteTodo,
    exportTodos,
    importTodos,
  };
}