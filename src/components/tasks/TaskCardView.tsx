import type { Task } from "../../types/task";
import { TaskItem } from "./TaskItem";

type TaskCardViewProps = {
  tasks: Task[];
  onToggleCompleted: (id: string) => void;
  onEditTask: (task: Task) => void;
  onRequestDeleteTask: (task: Task) => void;
};

export function TaskCardView({
  tasks,
  onToggleCompleted,
  onEditTask,
  onRequestDeleteTask,
}: TaskCardViewProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      aria-label="Tasks in card layout"
    >
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleCompleted={onToggleCompleted}
          onEditTask={onEditTask}
          onRequestDeleteTask={onRequestDeleteTask}
          variant="card"
          entranceClassName="task-card-enter"
          entranceStyle={{ animationDelay: `${index * 60}ms` }}
        />
      ))}
    </div>
  );
}
