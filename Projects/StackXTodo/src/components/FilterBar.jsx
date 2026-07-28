export default function FilterBar({ filter, setFilter, scopedTodos }) {
  const openCount = scopedTodos.filter(t => !t.done).length;
  const doneCount = scopedTodos.filter(t => t.done).length;

  return (
    <div className="flex items-center gap-1.5 mb-3.5">
      {["all", "active", "done"].map(f => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`text-[13px] px-3 py-[6px] rounded-[7px] cursor-pointer border-none transition-colors ${
            filter === f
              ? "bg-surface-accent text-accent font-medium"
              : "bg-transparent text-text-secondary hover:bg-gray-100"
          }`}
        >
          {f === "all" ? "All" : f === "active" ? "Active" : "Done"}
        </button>
      ))}
      <span className="ml-auto font-mono text-[11.5px] text-text-lighter">
        {openCount} open · {doneCount} done
      </span>
    </div>
  );
}
