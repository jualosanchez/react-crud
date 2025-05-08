import { useEffect, useState, type JSX } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask, markAsDone, updateTask } from '../../features/tasks/tasksSlice';
import type { RootState, AppDispatch } from '../../store/store';

function TaskList(): JSX.Element {
  // Obtener tareas desde el estado de Redux
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const [editTitle, setEditTitle] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {tasks.map((task) => (
        <li key={task.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
             <div className="min-w-0 flex-auto">
               <p className="text-sm/6 font-semibold text-gray-900" onDoubleClick={() => setEditTitle(!editTitle)}>
                {!editTitle && task.title}
                {editTitle && (
                  <form className="w-full max-w-sm">
                    <div className="flex items-center border-b border-teal-500 py-2">
                      <input
                        id={`edit-title-input-${task.id}`} 
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder={task.title}
                        aria-label={task.title}
                      />
                        <button
                        className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const input = document.getElementById(`edit-title-input-${task.id}`) as HTMLInputElement | null;
                          if (input) {
                          dispatch(updateTask({ ...task, title: input.value ? input.value : task.title }));
                          }
                          setEditTitle(false);
                        }}
                        >
                        Done
                        </button>
                      <button
                        className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const input = document.getElementById(`edit-title-input-${task.id}`) as HTMLInputElement | null;
                          if (input) {
                          dispatch(updateTask({ ...task, title: task.title }));
                          }
                          setEditTitle(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>                  
                )}
               </p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">ID# {task.id}</p>
             </div>
           </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">{task.completed ? 'Completado' : 'No completado'}</p>
              {task.completed ? (
                <span className="sm:ml-3">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => dispatch(deleteTask(task.id))}
                  >
                    Eliminar
                  </button>
                </span>
              ) : (
                <span className="sm:ml-3">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    onClick={() => dispatch(markAsDone(task.id))}
                  >
                    Done
                  </button>
                </span>
              )}
           </div>          
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

// const people = [
//   {
//     name: 'Leslie Alexander',
//     email: 'leslie.alexander@example.com',
//     role: 'Co-Founder / CEO',
//     imageUrl:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: '3h ago',
//     lastSeenDateTime: '2023-01-23T13:23Z',
//   },
//   {
//     name: 'Michael Foster',
//     email: 'michael.foster@example.com',
//     role: 'Co-Founder / CTO',
//     imageUrl:
//       'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: '3h ago',
//     lastSeenDateTime: '2023-01-23T13:23Z',
//   },
//   {
//     name: 'Dries Vincent',
//     email: 'dries.vincent@example.com',
//     role: 'Business Relations',
//     imageUrl:
//       'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: null,
//   },
//   {
//     name: 'Lindsay Walton',
//     email: 'lindsay.walton@example.com',
//     role: 'Front-end Developer',
//     imageUrl:
//       'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: '3h ago',
//     lastSeenDateTime: '2023-01-23T13:23Z',
//   },
//   {
//     name: 'Courtney Henry',
//     email: 'courtney.henry@example.com',
//     role: 'Designer',
//     imageUrl:
//       'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: '3h ago',
//     lastSeenDateTime: '2023-01-23T13:23Z',
//   },
//   {
//     name: 'Tom Cook',
//     email: 'tom.cook@example.com',
//     role: 'Director of Product',
//     imageUrl:
//       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     lastSeen: null,
//   },
// ]

// export default function Example() {
//   return (
//     <ul role="list" className="divide-y divide-gray-100">
//       {people.map((person) => (
//         <li key={person.email} className="flex justify-between gap-x-6 py-5">
//           <div className="flex min-w-0 gap-x-4">
//             <img alt="" src={person.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" />
//             <div className="min-w-0 flex-auto">
//               <p className="text-sm/6 font-semibold text-gray-900">{person.name}</p>
//               <p className="mt-1 truncate text-xs/5 text-gray-500">{person.email}</p>
//             </div>
//           </div>
//           <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
//             <p className="text-sm/6 text-gray-900">{person.role}</p>
//             {person.lastSeen ? (
//               <p className="mt-1 text-xs/5 text-gray-500">
//                 Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
//               </p>
//             ) : (
//               <div className="mt-1 flex items-center gap-x-1.5">
//                 <div className="flex-none rounded-full bg-emerald-500/20 p-1">
//                   <div className="size-1.5 rounded-full bg-emerald-500" />
//                 </div>
//                 <p className="text-xs/5 text-gray-500">Online</p>
//               </div>
//             )}
//           </div>
//         </li>
//       ))}
//     </ul>
//   )
// }
