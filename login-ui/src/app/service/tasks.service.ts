import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/Tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL: string = "http://localhost:3000/api/task"

  constructor(private http: HttpClient) { }

  getPublicTasks(userID: string){
    return this.http.get<Task[]>(`${this.URL}/public/${userID}`);
  }

  postPublicTasks(userID: string, task: Task){
    return this.http.post(`${this.URL}/public/${userID}`, task);
  }

  deletePublicTasks(userID: string){
    return this.http.delete<Task>(`${this.URL}/public/${userID}`);
  }

  getPrivateTasks(userID: string){
    return this.http.get<Task[]>(`${this.URL}/private/${userID}`);
  }
  
  postPrivateTasks(userID: string, task: Task){
    return this.http.post(`${this.URL}/private/${userID}`, task);
  }

  deletePrivateTasks(userID: string){
    return this.http.delete(`${this.URL}/private/${userID}`);
  }

  getTask(userID: string, taskID: string){
    return this.http.get<Task>(`${this.URL}/${userID}/${taskID}`);
  }

  putTask(userID: string, taskID: string, task: Task){
    return this.http.put(`${this.URL}/${userID}/${taskID}`, task);
  }
  
  deleteTask(userID: string, taskID: string){
    return this.http.delete(`${this.URL}/${userID}/${taskID}`);
  }
}
