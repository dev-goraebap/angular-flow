import { Injectable, inject } from "@angular/core";
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { nanoid } from "nanoid";
import { from, tap } from "rxjs";
import { ProfileState, TodoModel, TodoState } from "src/entities";
import { firestore } from "src/shared";
import { AddOrEditTodoModel } from "./todo.model";

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private readonly profileState = inject(ProfileState);

    private readonly todoState = inject(TodoState);

    private readonly TODO_PATH = `todos`;

    initTodoList() {
        const userId = this.profileState.getUserId();
        const todoCollection = collection(firestore, this.TODO_PATH);

        const q = query(todoCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));
        const promise = getDocs(q);

        return from(promise).pipe(
            tap(querySnapshot => {
                const todos: TodoModel[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                } as TodoModel));

                this.todoState.initTodos(todos);
            })
        ).subscribe();
    }

    addTodo(content: string) {
        const createTodo: AddOrEditTodoModel = {
            content,
            completed: false,
            createdAt: new Date(),
            userId: this.profileState.getUserId()
        };

        const todoDocRef = doc(firestore, `${this.TODO_PATH}/${nanoid()}`);
        const promise = setDoc(todoDocRef, createTodo);

        return from(promise).pipe(
            tap(() => this.initTodoList())
        ).subscribe();
    }

    editTodo({ id, ...updatedTodo }: TodoModel) {
        const todoDocRef = doc(firestore, `${this.TODO_PATH}/${id}`);

        const promise = updateDoc(todoDocRef, updatedTodo as AddOrEditTodoModel);
        return from(promise).pipe(
            tap(() => this.initTodoList())
        ).subscribe();
    }
    
    removeTodo(todoId: string) {
        const todoDocRef = doc(firestore, `${this.TODO_PATH}/${todoId}`);
        const promise = deleteDoc(todoDocRef);
        return from(promise).pipe(
            tap(() => this.initTodoList())
        ).subscribe();
    }
}