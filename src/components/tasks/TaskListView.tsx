import type { Task } from "../../types/task";
import { taskListRowClass } from "../../lib/taskDisplay";
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
      className="m-0 flex list-none flex-col gap-3 p-0 sm:gap-4"
      aria-label="Tasks in list layout"
    >
      {tasks.map((task, index) => (
        <li
          key={task.id}
          className={[
            "task-card-enter min-w-0 overflow-hidden rounded-xl border border-border bg-elevated shadow-sm",
            "px-4 py-4 sm:px-5 sm:py-5",
            taskListRowClass(task.completed),
          ].join(" ")}
          style={{ animationDelay: `${index * 55}ms` }}
          aria-label={
            task.completed
              ? `${task.title}, completed`
              : `${task.title}, pending`
          }
        >
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
