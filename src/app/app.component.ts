import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  SERVER_URI = 'https://task-server-n6aw.onrender.com/api/tasks';
  title = 'homes';
  tasks: {
    title: string;
    description: string;
    priority: string;
    completed: boolean;
    createdAt: string;
    dueDate: string;
    _id: string;
  }[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.tasks = [];
  }

  deleteTask(id: string) {
    const deleteTaskDB = async () => {
      const res = await fetch(`${this.SERVER_URI}/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        this.tasks = this.tasks.filter((task) => task._id !== id);
      }
      this.router.navigate([this.router.url]);
    };
    deleteTaskDB();
  }

  addTask(event: any) {
    const addTaksDB = async () => {
      const res = await fetch(`${this.SERVER_URI}`, {
        method: 'POST',
        body: JSON.stringify({
          title: event.title,
          description: event.description,
          priority: event.priority,
          completed: event.completed,
          dueDate: event.dueDate,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        console.log(res);
        return;
      }
      this.tasks.unshift({ ...event });
      this.router.navigate([this.router.url]);
    };
    addTaksDB();
  }

  updateTask(idx: string) {
    const updateTaskDB = async () => {
      const res = await fetch(`${this.SERVER_URI}/${idx}`, {
        method: 'PATCH',
        body: JSON.stringify({
          id: idx,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        this.tasks = this.tasks.map((task, index) =>
          task._id !== idx
            ? { ...task }
            : { ...task, completed: !task.completed }
        );
      }
      this.router.navigate([this.router.url]);
    };
    updateTaskDB();
  }

  sortTasks(sortBy: string) {
    if (sortBy.includes('Completed')) {
      const completed = this.tasks.filter((task) => task.completed === true);
      const unCompleted = this.tasks.filter((task) => task.completed !== true);
      this.tasks = completed.concat(unCompleted);
    } else if (sortBy.includes('Due Date')) {
      this.tasks = this.tasks.sort((a, b) => {
        return a > b ? 1 : 0;
      });
    } else {
      const highPriority = this.tasks.filter(
        (task) => task.priority === 'high'
      );
      const mediumPriority = this.tasks.filter(
        (task) => task.priority === 'medium'
      );
      const lowPriority = this.tasks.filter((task) => task.priority === 'low');
      this.tasks = highPriority.concat(mediumPriority.concat(lowPriority));
    }
  }

  ngOnInit(): void {
    const fetchData = async () => {
      const res = await fetch(`${this.SERVER_URI}`);
      const data: any = await res.json();
      this.tasks = data;
      console.log(data);
    };
    fetchData();
  }

  ngOnChange() {
    this.tasks = [];
  }
}
