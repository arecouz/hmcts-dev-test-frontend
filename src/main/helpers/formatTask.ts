import type { Task, TaskResponse } from 'types';

export function formatTaskForView(task: Task): TaskResponse {
  return {
    ...task,
    dueDate: task.dueDate.toLocaleDateString('en-GB'),
    createdDate: task.createdDate.toLocaleDateString('en-GB'),
  };
}
