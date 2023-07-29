import { Input, Output, Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  message: string = 'Message from child';
  @Input() tasks: {
    title: string;
    description: string;
    priority: string;
    completed: boolean;
    createdAt: string;
    dueDate: string;
    _id: string;
  }[] = [];
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateTaskEvent = new EventEmitter<string>();

  deleteTask(idx: string) {
    this.deleteEvent.emit(idx);
  }

  updateTask(idx: string) {
    this.updateTaskEvent.emit(idx);
  }
}
