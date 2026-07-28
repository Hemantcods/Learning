import {
  Inbox, FolderPlus, X, MoreHorizontal, Pencil, Trash2,
} from "lucide-react";

export default function Sidebar({
  folders, activeFolder, generalCounts, countsFor,
  onSelectFolder, onCreateFolder, onEditFolder, onDeleteFolder,
  sidebarOpen, onCloseSidebar, openMenuFolderId, onSetOpenMenuFolderId, saveError,
}) {
  return (
    <>
      {sidebarOpen && (
        <div onClick={onCloseSidebar} className="fixed inset-0 bg-surface-overlay z-30" />
      )}
      <aside
        className={`stax-sidebar w-[264px] min-w-[264px] bg-surface-dark text-text-sidebar flex flex-col h-full fixed left-0 top-0 transition-transform duration-200 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="flex items-center gap-2.5 px-[18px] pt-5 pb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent-light flex items-center justify-center font-display font-bold text-[15px] text-white">
            S
          </div>
          <span className="font-display font-semibold text-[17px] tracking-tight">Stax</span>
          <button onClick={onCloseSidebar} className="ml-auto bg-transparent border-none text-text-sidebar cursor-pointer p-1 lg:hidden">
            <X size={18} />
          </button>
        </div>

        <nav className="stax-scroll flex-1 overflow-y-auto px-3 py-1">
          <button
            onClick={() => { onSelectFolder("general"); onCloseSidebar(); }}
            className={`w-full flex items-center gap-2.5 px-2.5 py-[9px] rounded-lg border-none text-sm font-sans cursor-pointer mb-0.5 transition-colors ${
              activeFolder === "general"
                ? "bg-surface-dark-hover text-white"
                : "bg-transparent text-text-light hover:bg-surface-dark-hover hover:text-white"
            }`}
          >
            <Inbox size={16} className="opacity-85 shrink-0" />
            <span className="flex-1 text-left truncate">General</span>
            {generalCounts.open > 0 && (
              <span className="font-mono text-[11px] text-[#9694A6] bg-white/10 px-[6px] py-[2px] rounded-[5px]">{generalCounts.open}</span>
            )}
          </button>

          <div className="flex items-center justify-between text-[11px] tracking-widest uppercase text-text-muted px-2.5 pt-[18px] pb-2">
            <span>Projects</span>
            <button onClick={onCreateFolder} className="bg-transparent border-none text-text-secondary cursor-pointer p-1 rounded-md flex" title="New folder">
              <FolderPlus size={14} />
            </button>
          </div>

          <div>
            {folders.length === 0 && (
              <p className="text-[12.5px] text-text-muted px-2.5 pb-2 leading-relaxed">
                No project folders yet. Create one to group related tasks.
              </p>
            )}
            {folders.map(folder => {
              const c = countsFor(folder.id);
              return (
                <div key={folder.id} className="stax-folder-item relative">
                  <button
                    onClick={() => { onSelectFolder(folder.id); onCloseSidebar(); }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-[9px] rounded-lg border-none text-sm font-sans cursor-pointer mb-0.5 transition-colors ${
                      activeFolder === folder.id
                        ? "bg-surface-dark-hover text-white"
                        : "bg-transparent text-text-light hover:bg-surface-dark-hover hover:text-white"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: folder.color }} />
                    <span className="flex-1 text-left truncate">{folder.name}</span>
                    {c.open > 0 && (
                      <span className="font-mono text-[11px] text-[#9694A6] bg-white/10 px-[6px] py-[2px] rounded-[5px]">{c.open}</span>
                    )}
                    <span
                      className="stax-folder-menu-btn opacity-0 text-text-secondary flex p-[2px] rounded cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); onSetOpenMenuFolderId(openMenuFolderId === folder.id ? null : folder.id); }}
                    >
                      <MoreHorizontal size={14} />
                    </span>
                  </button>
                  {openMenuFolderId === folder.id && (
                    <div className="absolute right-2 top-full z-10 bg-surface-popover border border-white/10 rounded-lg p-1 min-w-[168px] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                      <button
                        className="w-full flex items-center gap-2 px-2 py-[7px] text-[13px] text-[#D8D7E3] bg-transparent border-none rounded-[5px] cursor-pointer text-left hover:bg-white/5"
                        onClick={() => onEditFolder(folder)}
                      >
                        <Pencil size={13} /> Rename & recolor
                      </button>
                      <button
                        className="w-full flex items-center gap-2 px-2 py-[7px] text-[13px] bg-transparent border-none rounded-[5px] cursor-pointer text-left hover:bg-white/5"
                        style={{ color: "#F0997B" }}
                        onClick={() => onDeleteFolder(folder.id)}
                      >
                        <Trash2 size={13} /> Delete folder
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        <div className="px-[18px] py-3 border-t border-white/10">
          <span className="font-mono text-[11px] text-[#6E6D7A]">
            {saveError ? "sync paused" : "synced"}
          </span>
        </div>
      </aside>
    </>
  );
}
