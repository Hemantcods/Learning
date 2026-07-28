import { Menu, LayoutGrid, ChevronRight, Inbox, Search } from "lucide-react";

export default function TopBar({ currentFolder, search, setSearch, onMenuClick }) {
  return (
    <header className="flex items-start gap-4 px-7 pt-[22px] pb-[18px] border-b border-border-base bg-surface-white">
      <button onClick={onMenuClick} className="lg:hidden bg-transparent border border-border-base rounded-lg p-2 cursor-pointer text-text-primary">
        <Menu size={20} />
      </button>
      <div className="flex-1">
        <div className="flex items-center gap-1.5 text-[12px] text-text-secondary uppercase tracking-wider mb-1">
          {currentFolder ? (
            <>
              <LayoutGrid size={12} className="opacity-50" />
              <span>Projects</span>
              <ChevronRight size={12} className="opacity-40" />
            </>
          ) : (
            <>
              <Inbox size={12} className="opacity-50" />
              <span>Workspace</span>
              <ChevronRight size={12} className="opacity-40" />
            </>
          )}
        </div>
        <h1 className="font-display text-2xl font-semibold text-text-primary flex items-center m-0">
          {currentFolder && (
            <span className="w-2 h-2 rounded-full shrink-0 mr-2.5" style={{ background: currentFolder.color }} />
          )}
          {currentFolder ? currentFolder.name : "General"}
        </h1>
      </div>
      <div className="relative w-[240px] max-sm:hidden">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks"
          className="w-full py-[9px] pl-[34px] pr-3 rounded-lg border border-border-base bg-surface text-[13.5px] text-text-primary outline-none"
        />
      </div>
    </header>
  );
}
