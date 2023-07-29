import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent {
  title: string = '';
  description: string = '';
  priority: string = '';
  completed: boolean = false;
  dueDate: Date = new Date();
  @Output() addTaskEvent = new EventEmitter<{
    title: string;
    description: string;
    priority: string;
    completed: boolean;
    dueDate: Date;
  }>();
  @Output() sortTasksEvent = new EventEmitter<string>();

  addTask(event: any) {
    this.addTaskEvent.emit({
      title: this.title,
      description: this.description,
      priority: this.priority,
      completed: this.completed,
      dueDate: this.dueDate,
    });
    this.title = '';
    this.description = '';

    console.log('here');
  }

  titleKeyUp(input: any) {
    this.title = input.target.value;
  }

  handleChange(event: any) {
    this.priority = event.target.value;
  }

  descriptionKeyUp(input: any) {
    this.description = input.target.value;
  }

  handleDateChange(event: any) {
    this.dueDate = event.target.value;
  }

  sortTasks(event: any) {
    this.sortTasksEvent.emit(event.target.value);
  }
}
