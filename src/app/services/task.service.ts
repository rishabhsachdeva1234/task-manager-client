import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IServerResponse } from '../interfaces/server-response.interface';
import { ITaskList } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _serverUrl = environment.serverUrl;
  constructor(private _http: HttpClient) {}

  addNewTask(task: { name: string }): Observable<IServerResponse<string>> {
    return this._http.post<IServerResponse<string>>(
      `${this._serverUrl}/task`,
      task
    );
  }

  getAllTasks(): Observable<ITaskList[]> {
    return this._http.get<ITaskList[]>(`${this._serverUrl}/task`);
  }

  getTask(id: string): Observable<ITaskList> {
    return this._http.get<ITaskList>(`${this._serverUrl}/task/${id}`);
  }

  updateTask(
    id: string,
    data: { name: string; completed: boolean }
  ): Observable<IServerResponse<string>> {
    return this._http.patch<IServerResponse<string>>(
      `${this._serverUrl}/task/${id}`,
      data
    );
  }

  deleteTask(id: string): Observable<IServerResponse<string>> {
    return this._http.delete<IServerResponse<string>>(
      `${this._serverUrl}/task/${id}`
    );
  }
}
