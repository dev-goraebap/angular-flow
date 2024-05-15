import { TodoModel } from "src/entities";

export type AddOrEditTodoModel = Omit<TodoModel, 'id'>;