import { X } from "lucide-react";
import { FOLDER_COLORS } from "../constants";

export default function FolderModal({
  show, mode, nameDraft, colorDraft, onNameChange, onColorChange,
  onSave, onClose, onKeyDown,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-surface-overlay flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface-white rounded-xl p-[22px] w-[320px] shadow-[0_20px_60px_rgba(0,0,0,0.25)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="font-display text-base font-semibold text-text-primary m-0">
            {mode === "create" ? "New folder" : "Edit folder"}
          </h3>
          <button onClick={onClose} className="bg-transparent border-none text-text-secondary cursor-pointer p-1 rounded-md flex">
            <X size={16} />
          </button>
        </div>

        <input
          autoFocus
          value={nameDraft}
          onChange={(e) => onNameChange(e.target.value)}
          onKeyDown={(e) => onKeyDown(e, onSave)}
          placeholder="Folder name, e.g. Mobile App Launch"
          className="w-full px-3 py-2.5 rounded-lg border border-border-base text-sm outline-none mb-3.5"
        />

        <div className="flex gap-2.5 mb-5">
          {FOLDER_COLORS.map(c => (
            <button
              key={c.hex}
              onClick={() => onColorChange(c.hex)}
              className="w-6 h-6 rounded-full border-none cursor-pointer"
              style={{
                background: c.hex,
                outline: colorDraft === c.hex ? `2px solid ${c.hex}` : "none",
                outlineOffset: 2,
              }}
            />
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-transparent border border-border-base rounded-lg px-3.5 py-[9px] text-[13.5px] cursor-pointer text-text-primary"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-accent text-white border-none rounded-lg px-4 py-[9px] text-[13.5px] font-medium cursor-pointer hover:opacity-90 transition-opacity"
          >
            {mode === "create" ? "Create folder" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
