import { useRef } from 'react'; // 用于file input ref

export default function Header({ undone, done, showAdd, setShowAdd, exportTodos, importTodos, isLoading }) {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl px-6 mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">待办事项</h1>
        <p className="text-gray-500 text-sm mt-1">
          {undone} 条未完成 · {done} 条已完成
        </p>
      </div>
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={(e) => importTodos(e, true)} // merge=true
          className="hidden"
          disabled={isLoading}
        />
        <button
          onClick={handleImportClick}
          disabled={isLoading}
          className={`text-sm font-medium transition ${isLoading ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
          title="导入待办数据"
        >
          导入
        </button>
        <button
          onClick={exportTodos}
          disabled={isLoading}
          className={`text-sm font-medium transition ${isLoading ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
          title="导出待办数据"
        >
          导出
        </button>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="text-yellow-500 hover:text-yellow-600 text-3xl font-bold transition"
          title="添加新待办"
          disabled={isLoading}
        >
          {showAdd ? '−' : '＋'}
        </button>
      </div>
    </div>
  );
}