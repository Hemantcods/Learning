import { useState } from "react";
import { Circle, CheckCircle2, Flag, Trash2, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PRIORITIES } from "../constants";

export default function TodoItem({
  todo, activeFolder, folderNameById, folderColorById,
  onToggle, onDelete, onStartEdit, onCommitEdit, onCyclePriority,
}) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  const handleStartEdit = () => {
    setEditing(true);
    setEditText(todo.text);
    if (onStartEdit) onStartEdit(todo);
  };

  const handleCommit = () => {
    const text = editText.trim();
    if (text) {
      onCommitEdit(todo.id, text);
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCommit();
    if (e.key === "Escape") {
      setEditing(false);
      setEditText(todo.text);
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="stax-row stax-fade-in flex items-center gap-2.5 px-3 py-[11px] rounded-xl bg-surface-white border border-border-light">
      <button
        className="stax-checkbox bg-transparent border-none cursor-pointer p-0 flex shrink-0"
        onClick={() => onToggle(todo.id)}
      >
        {todo.done ? <CheckCircle2 size={20} color="#5B4FE0" /> : <Circle size={20} color="#C9C8D6" />}
      </button>

      <button
        onClick={() => onCyclePriority(todo.id)}
        title={`Priority: ${PRIORITIES[todo.priority || "medium"].label}. Click to change.`}
        className="bg-transparent border-none cursor-pointer p-0 flex opacity-85 shrink-0"
      >
        <Flag size={13} fill={PRIORITIES[todo.priority || "medium"].color} color={PRIORITIES[todo.priority || "medium"].color} />
      </button>

      {editing ? (
        <input
          autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleCommit}
          onKeyDown={handleKeyDown}
          className="flex-1 text-[14.5px] border border-[#C9C4F5] rounded-md px-2 py-1 outline-none"
        />
      ) : (
        <span
          onClick={handleStartEdit}
          className="flex-1 text-[14.5px] cursor-text leading-[1.4] truncate"
          style={{
            textDecoration: todo.done ? "line-through" : "none",
            color: todo.done ? "#A8A7B3" : "#16161F",
          }}
        >
          {todo.text}
        </span>
      )}

      {activeFolder === "general" && todo.folderId !== "general" && (
        <span
          className="text-[11px] px-2 py-[3px] rounded-md font-medium whitespace-nowrap"
          style={{ background: folderColorById(todo.folderId) + "1A", color: folderColorById(todo.folderId) }}
        >
          {folderNameById(todo.folderId)}
        </span>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="bg-transparent border-none text-text-lighter cursor-pointer p-1 flex shrink-0 hover:text-red-400 transition-colors"
      >
        <Trash2 size={15} />
      </button>

      <button
        {...attributes}
        {...listeners}
        className="bg-transparent border-none text-text-lighter cursor-grab active:cursor-grabbing p-1 flex shrink-0 hover:text-text-primary transition-colors touch-none"
        title="Drag to reorder"
      >
        <GripVertical size={15} />
      </button>
    </div>
  );
}
