import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AddTaskPageRoutingModule } from './add-task-routing.module';

import { AddTaskPage } from './add-task.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AddTaskPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AddTaskPage]
})
export class AddTaskPageModule { }
