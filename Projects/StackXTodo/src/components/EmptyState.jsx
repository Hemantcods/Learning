import { CheckCircle2 } from "lucide-react";

export default function EmptyState({ search, filter }) {
  return (
    <div className="text-center px-5 py-[60px]">
      <CheckCircle2 size={28} className="text-text-lighter mb-2.5 mx-auto" />
      <p className="text-sm text-text-secondary m-0">
        {search
          ? "No tasks match your search."
          : filter === "done"
            ? "Nothing completed yet."
            : "Nothing here. Add your first task above."}
      </p>
    </div>
  );
}
