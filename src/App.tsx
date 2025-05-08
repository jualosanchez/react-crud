import LayoutPage from './components/layout-page/LayoutPage';
import TaskForm from './components/task-form/TaskForm';
import TaskList from './components/task-list/TaskList';

function App() {

  return (
    <div className="h-screen overflow-x-hidden">
      <LayoutPage>
        <>
          <TaskForm />
          <TaskList />
        </>
      </LayoutPage>
    </div>
  )
}

export default App
