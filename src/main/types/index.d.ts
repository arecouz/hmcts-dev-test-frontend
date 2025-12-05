// dueDate as string
export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  createdDate: string;
}

// dueDate as Date
export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  createdDate: Date;
}

export interface NewTask {
  title: string;
  description: string;
  dueDateDay: string;
  dueDateMonth: string;
  dueDateYear: string;
  completed: boolean;
}

interface FormField {
  id?: string;
  name?: string;
  namePrefix?: string;
  label?: { text: string };
  hint?: { text: string };
  value?: string;
  classes?: string;
  errorMessage?: { text: string };
  fieldset?: { legend: { text: string } };
  items?: { name: string; value: string; classes: string }[];
}

interface TaskForm {
  titleInput: FormField;
  descriptionInput: FormField;
  dueDateInput: FormField;
}

interface TaskFormErrors {
  title?: string;
  description?: string;
  'dueDate-day'?: string;
  'dueDate-month'?: string;
  'dueDate-year'?: string;
  date?: string;
}
