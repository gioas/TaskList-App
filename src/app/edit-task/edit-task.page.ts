import { Component, OnInit } from '@angular/core';
import { TaskService } from './../shared/task.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {

  updateTaskForm: FormGroup;
  id: any;

  constructor(
    private taskAPI: TaskService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getTaskData(this.id);
    this.updateTaskForm = this.fb.group({
      task_name: [''],
      task_data: ['']
    })
  }

  getTaskData(id) {
    this.taskAPI.getTask(id).subscribe(res => {
      this.updateTaskForm.setValue({
        task_name: res['task_name'],
        task_data: res['task_data']
      });
    });
  }

  updateForm() {
    if (!this.updateTaskForm.valid) {
      return false;
    } else {
      this.taskAPI.updateTask(this.id, this.updateTaskForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updateTaskForm.reset();
          this.router.navigate(['/home']);
        })
    }
  }

}
