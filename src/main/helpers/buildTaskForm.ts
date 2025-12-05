import type { NewTask, TaskForm, TaskFormErrors } from 'types';

export function buildTaskForm(data: Partial<NewTask> = {}, errors: TaskFormErrors = {}): TaskForm {
  const { title = '', description = '', dueDateDay = '', dueDateMonth = '', dueDateYear = '' } = data;

  const dateHasAnyError = errors['dueDate-day'] || errors['dueDate-month'] || errors['dueDate-year'] || errors.date;

  return {
    titleInput: {
      id: 'title',
      name: 'title',
      label: { text: 'What is the title of the task?' },
      value: title,
      classes: errors.title ? 'govuk-input--error' : '',
      errorMessage: errors.title ? { text: errors.title } : undefined,
    },
    descriptionInput: {
      id: 'description',
      name: 'description',
      label: { text: 'What is a description of the task?' },
      hint: { text: 'This should be a brief overview of the task and give more information than the title' },
      value: description,
      classes: errors.description ? 'govuk-input--error' : '',
      errorMessage: errors.description ? { text: errors.description } : undefined,
    },
    dueDateInput: {
      id: 'dueDate',
      namePrefix: 'dueDate',
      fieldset: { legend: { text: 'When does your task need to be completed by?' } },
      hint: { text: 'For example, 21 3 2026' },
      items: [
        {
          name: 'day',
          value: dueDateDay,
          classes: (errors['dueDate-day'] ? 'govuk-input--error ' : '') + 'govuk-input--width-2',
        },
        {
          name: 'month',
          value: dueDateMonth,
          classes: (errors['dueDate-month'] ? 'govuk-input--error ' : '') + 'govuk-input--width-2',
        },
        {
          name: 'year',
          value: dueDateYear,
          classes: (errors['dueDate-year'] ? 'govuk-input--error ' : '') + 'govuk-input--width-4',
        },
      ],
      classes: dateHasAnyError ? 'govuk-form-group--error' : '',
      errorMessage: dateHasAnyError ? { text: errors.date || 'Enter a valid due date' } : undefined,
    },
  };
}
