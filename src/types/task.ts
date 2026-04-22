export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const

export type TaskPriority = (typeof TASK_PRIORITIES)[number]

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export type NewTaskFields = {
  title: string
  description: string
  priority: TaskPriority
  /** `YYYY-MM-DD` from `<input type="date" />` */
  dueDate: string
}

export type Task = NewTaskFields & {
  id: string
  createdAt: string
  /** When false, task is **Pending**; when true, **Completed**. */
  completed: boolean
}

export const TASK_STATUS_LABEL = {
  pending: 'Pending',
  completed: 'Completed',
} as const

export function getTaskStatusLabel(task: Task): string {
  return task.completed ? TASK_STATUS_LABEL.completed : TASK_STATUS_LABEL.pending
}
