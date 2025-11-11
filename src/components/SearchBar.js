export default function SearchBar({ search, setSearch }) {
  return (
    <div className="w-full max-w-2xl px-6 mb-6 flex items-center">
      <input
        type="text"
        placeholder="搜索标题..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white shadow-sm"
      />
    </div>
  );
}
