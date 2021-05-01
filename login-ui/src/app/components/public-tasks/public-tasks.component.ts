import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { TasksService } from '../../service/tasks.service';
import { DataServiceService } from '../../service/data-service.service';
import { Task } from '../../interfaces/Tasks';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-public-tasks',
  templateUrl: './public-tasks.component.html',
  styleUrls: ['./public-tasks.component.css']
})
export class PublicTasksComponent implements OnInit {

  private userID: string;
  tasks: Task[] = [];
  selectedTask: Task = {} as Task;
  newTask: Task = {} as Task;

  constructor(private activatedRoute: ActivatedRoute, private taskService: TasksService, private dataService: DataServiceService, private cookies: CookieService) { }

  ngOnInit(): void {
    this.dataService.currentID.subscribe(
      res => { this.userID = res; },
      error => { console.log(error); }
    );
    this.getTasks();
  }

  getTasks(){
    this.taskService.getPublicTasks(this.userID)
    .subscribe(
      res => { this.tasks = res; },
      error => { console.log(error) }
    );
  }

  saveTask(task: NgForm){
    if(!task.value.description){
      return;
    }
    this.taskService.postPublicTasks(this.userID, task.value)
    .subscribe(
      res => {
        this.tasks.push(res['tasks'].pop());
        this.newTask = {} as Task;
        task.resetForm();
      },
      error => { console.log(error) }
    );
  }

  setEditableTask(task: Task){
    this.selectedTask = task;
  }

  unsetEditableTask(){
    this.selectedTask = {} as Task;
  }

  updateTask(task: Task){
    this.taskService.putTask(this.userID, task._id, task)
    .subscribe(
      res => { this.unsetEditableTask(); },
      error => { console.log(error) }
    );
  }

  changeCheckTask(task: Task){
    task.done = !task.done;
    this.taskService.putTask(this.userID, task._id, task)
    .subscribe(
      res => { this.unsetEditableTask(); },
      error => { console.log(error) }
    );
  }

  changeVisibilityTask(task: Task){
    task.visibility = !task.visibility;
    this.taskService.putTask(this.userID, task._id, task)
    .subscribe(
      res => { this.unsetEditableTask(); },
      error => { console.log(error) }
    );
  }

  deleteTask(task: Task){
    this.taskService.deleteTask(this.userID, task._id)
    .subscribe(
      res => { this.tasks = this.tasks.filter(item => {
        if(item._id != task._id){
          return item;
        }
      }) },
      error => { console.log(error); }
    );

  }
}
