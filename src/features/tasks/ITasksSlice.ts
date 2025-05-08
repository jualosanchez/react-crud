export interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

export interface ITasksState {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
}

export const initialState: ITasksState = {
  tasks: [],
  loading: false,
  error: null,
};
