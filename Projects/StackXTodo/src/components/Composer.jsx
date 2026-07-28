import { Plus } from "lucide-react";
import { PRIORITIES } from "../constants";

export default function Composer({
  newTodoText, setNewTodoText, newTodoPriority, setNewTodoPriority, onAdd, onKeyDown, placeholder,
}) {
  return (
    <div className="flex items-center gap-2.5 bg-surface-white border border-border-base rounded-xl px-4 py-[6px] mb-[18px]">
      <input
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        onKeyDown={(e) => onKeyDown(e, onAdd)}
        placeholder={placeholder}
        className="flex-1 border-none outline-none text-[14.5px] py-2.5 text-text-primary bg-transparent"
      />
      <div className="flex gap-1.5 px-1">
        {Object.entries(PRIORITIES).map(([key, p]) => (
          <button
            key={key}
            onClick={() => setNewTodoPriority(key)}
            title={p.label}
            className="w-4 h-4 rounded-full cursor-pointer p-0 border"
            style={{
              background: newTodoPriority === key ? p.color : "transparent",
              borderColor: p.color,
            }}
          />
        ))}
      </div>
      <button onClick={onAdd} className="flex items-center gap-1.5 bg-accent text-white border-none rounded-lg px-4 py-2.5 text-[13.5px] font-medium cursor-pointer whitespace-nowrap hover:opacity-90 transition-opacity">
        <Plus size={16} />
        <span>Add</span>
      </button>
    </div>
  );
}
