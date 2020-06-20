import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addTask(task: Task): Observable<any> {
    return this.http.post<Task>('http://localhost:3000/api/create-task', task, this.httpOptions)
      .pipe(
        catchError(this.handleError<Task>('Add Task'))
      );
  }

  getTask(id): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/api/get-task/' + id)
      .pipe(
        tap(_ => console.log(`Task selezionata: ${id}`)),
        catchError(this.handleError<Task[]>(`Get Task id=${id}`))
      );
  }

  getTaskList(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/api')
      .pipe(
        tap(tasks => console.log('Task trovate!')),
        catchError(this.handleError<Task[]>('Get Tasks', []))
      );
  }

  updateTask(id, task: Task): Observable<any> {
    return this.http.put('http://localhost:3000/api/update-task/' + id, task, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Task modificata: ${id}`)),
        catchError(this.handleError<Task[]>('Update Task'))
      );
  }

  deleteTask(id): Observable<Task[]> {
    return this.http.delete<Task[]>('http://localhost:3000/api/delete-task/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Task eliminata: ${id}`)),
        catchError(this.handleError<Task[]>('Delete Task'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}