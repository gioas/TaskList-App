import { Component, OnInit, NgZone } from '@angular/core';
import { TaskService } from './../shared/task.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})

export class AddTaskPage implements OnInit {

  taskForm: FormGroup;

  constructor(
    private taskAPI: TaskService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone
  ) {
    this.taskForm = this.fb.group({
      task_name: [''],
      task_data: ['']
    })
  }

  ngOnInit() { }

  onFormSubmit() {
    if (!this.taskForm.valid) {
      return false;
    } else {
      this.taskAPI.addTask(this.taskForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res)
            this.taskForm.reset();
            this.router.navigate(['/home']);
          })
        });
    }
  }

}
