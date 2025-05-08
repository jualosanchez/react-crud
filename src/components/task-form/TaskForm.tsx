import { type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addTask } from '../../features/tasks/tasksSlice';
import type { ITaskFormInputs } from './ITaskFomInputs';

function TaskForm(): JSX.Element {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ITaskFormInputs>();
  const dispatch = useDispatch();

  const onSubmit = (data: ITaskFormInputs) => {
    const newTask = { id: Date.now(), title: data.title, completed: false };
    dispatch(addTask(newTask));
    reset();
  };

  return (
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center border-b border-indigo-500 py-2">
          <input type="text" {...register('title', { required: 'Título requerido' })} name="title" placeholder="New Task" className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" />
          <button
            className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Add Task
          </button>
          <button
            className="flex-shrink-0 border-transparent border-4 text-indigo-500 hover:text-indigo-800 text-sm py-1 px-2 rounded"
            type="button"
            onClick={() => reset()}
          >
            Cancel
          </button>
        </div>
        {errors.title && (
        <div className="text-red-500 text-xs mt-1">{errors.title.message}</div>
      )}
      </form>
  );
};

export default TaskForm;