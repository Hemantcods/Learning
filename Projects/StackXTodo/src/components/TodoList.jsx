import { DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState";

export default function TodoList({
  visibleTodos, activeFolder, folderNameById, folderColorById,
  onToggle, onDelete, onCommitEdit, onCyclePriority, search, filter,
  onReorder,
}) {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    onReorder(active.id, over.id);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={visibleTodos.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-0.5">
          {visibleTodos.length === 0 ? (
            <EmptyState search={search} filter={filter} />
          ) : (
            visibleTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                activeFolder={activeFolder}
                folderNameById={folderNameById}
                folderColorById={folderColorById}
                onToggle={onToggle}
                onDelete={onDelete}
                onCommitEdit={onCommitEdit}
                onCyclePriority={onCyclePriority}
              />
            ))
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
