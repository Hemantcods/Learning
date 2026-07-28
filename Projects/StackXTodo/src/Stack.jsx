import { useState, useEffect } from "react";
import { FOLDER_COLORS } from "./constants";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Composer from "./components/Composer";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";
import FolderModal from "./components/FolderModal";

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

const DEFAULT_FOLDERS = [
  { id: "f-website", name: "Website Revamp", color: "#5B4FE0", createdAt: Date.now() },
  { id: "f-personal", name: "Personal", color: "#0F9D8F", createdAt: Date.now() },
];

const DEFAULT_TODOS = [
  { id: uid(), text: "Draft the homepage wireframe", done: false, folderId: "f-website", priority: "high", createdAt: Date.now() },
  { id: uid(), text: "Pick a color palette", done: true, folderId: "f-website", priority: "medium", createdAt: Date.now() },
  { id: uid(), text: "Book dentist appointment", done: false, folderId: "f-personal", priority: "low", createdAt: Date.now() },
  { id: uid(), text: "Reply to landlord's email", done: false, folderId: "general", priority: "medium", createdAt: Date.now() },
];

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch { /* ignore */ }
  return fallback;
}

export default function StaxTodoApp() {
  const [folders, setFolders] = useState(() => loadFromStorage("stax:folders", DEFAULT_FOLDERS));
  const [todos, setTodos] = useState(() => loadFromStorage("stax:todos", DEFAULT_TODOS));
  const [activeFolder, setActiveFolder] = useState("general");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState("medium");
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderModalMode, setFolderModalMode] = useState("create");
  const [folderModalId, setFolderModalId] = useState(null);
  const [folderNameDraft, setFolderNameDraft] = useState("");
  const [folderColorDraft, setFolderColorDraft] = useState(FOLDER_COLORS[0].hex);
  const [openMenuFolderId, setOpenMenuFolderId] = useState(null);
  const [saveError] = useState(false);

  useEffect(() => {
    try { localStorage.setItem("stax:folders", JSON.stringify(folders)); } catch { /* ignore */ }
  }, [folders]);

  useEffect(() => {
    try { localStorage.setItem("stax:todos", JSON.stringify(todos)); } catch { /* ignore */ }
  }, [todos]);

  const currentFolder = activeFolder === "general" ? null : folders.find(f => f.id === activeFolder);
  const scopedTodos = activeFolder === "general" ? todos : todos.filter(t => t.folderId === activeFolder);

  const visibleTodos = scopedTodos
    .filter(t => filter === "all" ? true : filter === "active" ? !t.done : t.done)
    .filter(t => t.text.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a.done === b.done ? b.createdAt - a.createdAt : a.done ? 1 : -1));

  const countsFor = (folderId) => {
    const list = folderId === "general" ? todos : todos.filter(t => t.folderId === folderId);
    const open = list.filter(t => !t.done).length;
    return { open, total: list.length };
  };

  const folderNameById = (id) => folders.find(f => f.id === id)?.name;
  const folderColorById = (id) => folders.find(f => f.id === id)?.color || "#8A8A99";

  const addTodo = () => {
    const text = newTodoText.trim();
    if (!text) return;
    const todo = {
      id: uid(),
      text,
      done: false,
      folderId: activeFolder === "general" ? "general" : activeFolder,
      priority: newTodoPriority,
      createdAt: Date.now(),
    };
    setTodos(prev => [todo, ...prev]);
    setNewTodoText("");
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const commitEdit = (id, text) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t));
  };

  const cyclePriority = (id) => {
    const order = ["low", "medium", "high"];
    setTodos(prev => prev.map(t => {
      if (t.id !== id) return t;
      const idx = order.indexOf(t.priority || "medium");
      return { ...t, priority: order[(idx + 1) % order.length] };
    }));
  };

  const openCreateFolder = () => {
    setFolderModalMode("create");
    setFolderNameDraft("");
    setFolderColorDraft(FOLDER_COLORS[Math.floor(Math.random() * FOLDER_COLORS.length)].hex);
    setShowFolderModal(true);
  };

  const openEditFolder = (folder) => {
    setFolderModalMode("edit");
    setFolderModalId(folder.id);
    setFolderNameDraft(folder.name);
    setFolderColorDraft(folder.color);
    setShowFolderModal(true);
  };

  const saveFolder = () => {
    const name = folderNameDraft.trim();
    if (!name) return;
    if (folderModalMode === "create") {
      const folder = { id: uid(), name, color: folderColorDraft, createdAt: Date.now() };
      setFolders(prev => [...prev, folder]);
      setActiveFolder(folder.id);
    } else {
      setFolders(prev => prev.map(f => f.id === folderModalId ? { ...f, name, color: folderColorDraft } : f));
    }
    setShowFolderModal(false);
  };

  const deleteFolder = (id) => {
    setFolders(prev => prev.filter(f => f.id !== id));
    setTodos(prev => prev.map(t => t.folderId === id ? { ...t, folderId: "general" } : t));
    if (activeFolder === id) setActiveFolder("general");
  };

  const handleKey = (e, cb) => {
    if (e.key === "Enter") cb();
    if (e.key === "Escape") {
      setShowFolderModal(false);
    }
  };

  const generalCounts = countsFor("general");

  return (
    <div className="flex h-screen w-full font-sans bg-surface overflow-hidden">
      <Sidebar
        folders={folders}
        activeFolder={activeFolder}
        generalCounts={generalCounts}
        countsFor={countsFor}
        onSelectFolder={setActiveFolder}
        onCreateFolder={openCreateFolder}
        onEditFolder={openEditFolder}
        onDeleteFolder={deleteFolder}
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
        openMenuFolderId={openMenuFolderId}
        onSetOpenMenuFolderId={setOpenMenuFolderId}
        saveError={saveError}
      />

      <main className="flex-1 flex flex-col min-w-0 h-full">
        <TopBar
          currentFolder={currentFolder}
          search={search}
          setSearch={setSearch}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="stax-scroll flex-1 overflow-y-auto px-7 pt-6 pb-[60px]">
          <Composer
            newTodoText={newTodoText}
            setNewTodoText={setNewTodoText}
            newTodoPriority={newTodoPriority}
            setNewTodoPriority={setNewTodoPriority}
            onAdd={addTodo}
            onKeyDown={handleKey}
            placeholder={currentFolder ? `Add a task to ${currentFolder.name}` : "Add a task to General"}
          />

          <FilterBar
            filter={filter}
            setFilter={setFilter}
            scopedTodos={scopedTodos}
          />

          <TodoList
            visibleTodos={visibleTodos}
            activeFolder={activeFolder}
            folderNameById={folderNameById}
            folderColorById={folderColorById}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onCommitEdit={commitEdit}
            onCyclePriority={cyclePriority}
            search={search}
            filter={filter}
          />
        </div>
      </main>

      <FolderModal
        show={showFolderModal}
        mode={folderModalMode}
        nameDraft={folderNameDraft}
        colorDraft={folderColorDraft}
        onNameChange={setFolderNameDraft}
        onColorChange={setFolderColorDraft}
        onSave={saveFolder}
        onClose={() => setShowFolderModal(false)}
        onKeyDown={handleKey}
      />
    </div>
  );
}
