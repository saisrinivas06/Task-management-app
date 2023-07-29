import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  tasks: {
    title: string;
    description: string;
    priority: string;
    completed: boolean;
    createdAt: string;
    dueDate: string;
    _id: string;
  }[];

  constructor() {
    this.tasks = [];
  }

  ngOnInit(): void {
    const fetchHistory = async () => {
      const res = await fetch(
        'https://task-server-n6aw.onrender.com/api/tasks/history'
      );
      const data = await res.json();
      this.tasks = data;
    };
    fetchHistory();
  }
}
