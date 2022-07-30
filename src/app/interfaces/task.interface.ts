export interface ITaskList {
  readonly _id: string;
  readonly name: string;
  readonly completed: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
