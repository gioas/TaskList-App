import { Component, OnInit } from '@angular/core';
import { TaskService } from './../shared/task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  Tasks: any = [];

  constructor(
    private taskService: TaskService
  ) {
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.taskService.getTaskList().subscribe((res) => {
      console.log(res)
      this.Tasks = res;
    })
  }

  deleteTask(task, i) {
    if (window.confirm('Vuoi eliminare la task?')) {
      this.taskService.deleteTask(task._id)
        .subscribe(() => {
          this.Tasks.splice(i, 1);
          console.log('Task eliminata! - i=' + i)
        }
        )
    }
  }
}
