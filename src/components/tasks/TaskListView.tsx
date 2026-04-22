import type { Task } from "../../types/task";
import { TaskItem } from "./TaskItem";

type TaskListViewProps = {
  tasks: Task[];
  onToggleCompleted: (id: string) => void;
  onEditTask: (task: Task) => void;
  onRequestDeleteTask: (task: Task) => void;
};

export function TaskListView({
  tasks,
  onToggleCompleted,
  onEditTask,
  onRequestDeleteTask,
}: TaskListViewProps) {
  return (
    <ul
      className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-elevated"
      aria-label="Tasks in list layout"
    >
      {tasks.map((task) => (
        <li key={task.id} className="px-4 py-4 sm:px-5 sm:py-5">
          <TaskItem
            task={task}
            onToggleCompleted={onToggleCompleted}
            onEditTask={onEditTask}
            onRequestDeleteTask={onRequestDeleteTask}
            variant="list"
          />
        </li>
      ))}
    </ul>
  );
}
