export default function Header({ undone, done, showAdd, setShowAdd }) {
  return (
    <div className="w-full max-w-2xl px-6 mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">待办事项</h1>
        <p className="text-gray-500 text-sm mt-1">
          {undone} 条未完成 · {done} 条已完成
        </p>
      </div>
      <button
        onClick={() => setShowAdd(!showAdd)}
        className="text-yellow-500 hover:text-yellow-600 text-3xl font-bold transition"
        title="添加新待办"
      >
        {showAdd ? '−' : '＋'}
      </button>
    </div>
  );
}
