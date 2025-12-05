import type { NewTask } from 'types';

import { buildTaskForm } from '../helpers/buildTaskForm';
import { formatTaskForView } from '../helpers/formatTask';
import { getTasks, saveTask, validateTaskForm } from '../services/taskService';

import { Application } from 'express';

export default function (app: Application): void {
  app.get('/', (req, res) => {
    res.redirect('/tasks');
  });

  app.get('/tasks', async (req, res) => {
    try {
      const tasks = await getTasks();
      const formattedTasks = tasks.map(formatTaskForView);
      res.render('tasks/index', { tasks: formattedTasks });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching tasks:', error);
      res.render('tasks/index', { tasks: [] });
    }
  });

  app.get('/tasks/new', (req, res) => {
    res.render('tasks/add-task', buildTaskForm());
  });

  app.post('/tasks/new', async (req, res) => {
    const {
      title,
      description,
      'dueDate-day': dueDateDay,
      'dueDate-month': dueDateMonth,
      'dueDate-year': dueDateYear,
    } = req.body;

    const newTask: NewTask = {
      title,
      description,
      dueDateDay,
      dueDateMonth,
      dueDateYear,
      completed: false,
    };

    const errors = validateTaskForm(newTask);

    if (Object.keys(errors).length > 0) {
      return res.render('tasks/add-task', buildTaskForm(newTask, errors));
    }

    try {
      const savedTask = await saveTask(newTask);

      const params = new URLSearchParams({
        title: savedTask.title,
        description: savedTask.description,
        dueDate: savedTask.dueDate,
      }).toString();

      res.redirect(`/tasks/success?${params}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error saving task:', error);
    }
  });

  app.get('/tasks/success', (req, res) => {
    const { title, description, dueDate } = req.query;
    res.render('tasks/task-success', {
      task: { title, description, dueDate },
    });
  });
}
