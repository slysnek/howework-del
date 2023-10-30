export interface IGetTasks {
  name: string;
  info: string;
  isCompleted: boolean;
  isImportant: boolean;
  id: number;
}

export interface IAddTask {
  name: string;
  info: string;
  isCompleted: boolean;
  isImportant: boolean;
  id: number;
}
export type AddTaskForm = {
  name?: string;
  info?: string;
  isCompleted?: string;
  isImportant?: string;
};
