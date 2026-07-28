import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState";

export default function TodoList({
  visibleTodos, activeFolder, folderNameById, folderColorById,
  onToggle, onDelete, onCommitEdit, onCyclePriority, search, filter,
}) {
  return (
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
  );
}
