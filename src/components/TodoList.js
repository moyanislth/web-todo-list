import TodoItem from './TodoItem';

export default function TodoList({ todos, toggleTodo, toggleExpand, deleteTodo, setShowAdd, setEditTodo }) {
  const undone = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  return (
    <div className="w-full max-w-2xl px-6 space-y-3 pb-10">
      {undone.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          toggleExpand={toggleExpand}
          deleteTodo={deleteTodo}
          setShowAdd={setShowAdd}
          setEditTodo={setEditTodo}
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

      {done.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          toggleExpand={toggleExpand}
          deleteTodo={deleteTodo}
          setShowAdd={setShowAdd}
          setEditTodo={setEditTodo}
        />
      ))}

      {todos.length === 0 && (
        <p className="text-gray-400 text-center py-10">未找到匹配的待办事项</p>
      )}
    </div>
  );
}
