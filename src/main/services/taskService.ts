import type { NewTask, Task, TaskResponse } from '../types';

import axios from 'axios';
import { format, isAfter, isValid } from 'date-fns';

const API = 'http://localhost:4000/api/tasks';

export async function getTasks(): Promise<Task[]> {
  const response = await axios.get<TaskResponse[]>(`${API}`);
  return response.data.map(task => ({
    ...task,
    dueDate: new Date(task.dueDate),
    createdDate: new Date(task.createdDate),
  }));
}

export async function saveTask(task: NewTask): Promise<TaskResponse> {
  const { dueDateDay, dueDateMonth, dueDateYear } = task;

  // YYYY-MM-DD format
  const date = new Date(Number(dueDateYear), Number(dueDateMonth) - 1, Number(dueDateDay));

  const isoDueDate = format(date, "yyyy-MM-dd'T'00:00:00'Z'");

  const payload = {
    ...task,
    dueDate: isoDueDate,
  };

  const response = await axios.post<TaskResponse>(API, payload);
  return response.data;
}

export function validateTaskForm(task: NewTask): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!task.title?.trim()) {
    errors.title = 'Enter a task title';
  }

  if (!task.description?.trim()) {
    errors.description = 'Enter a task description';
  }

  const { dueDateDay, dueDateMonth, dueDateYear } = task;

  // Check all inputs present
  if (!dueDateDay) {
    errors['dueDate-day'] = 'Enter a day';
  }
  if (!dueDateMonth) {
    errors['dueDate-month'] = 'Enter a month';
  }
  if (!dueDateYear) {
    errors['dueDate-year'] = 'Enter a year';
  }

  // Only validate if we have all parts
  if (dueDateDay && dueDateMonth && dueDateYear) {
    const numericDay = Number(dueDateDay);
    const numericMonth = Number(dueDateMonth);
    const numericYear = Number(dueDateYear);

    const date = new Date(`${numericYear}-${numericMonth}-${numericDay}`);

    if (!isValid(date)) {
      errors.date = 'Enter a valid date e.g. 31 1 2029';
    }

    // No past dates allowed
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isValid(date) && isAfter(today, date)) {
      errors.date = 'The due date must not be in the past';
    }
  }

  return errors;
}
