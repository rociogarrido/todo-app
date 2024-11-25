import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  newTask: string = '';
  tasks: { title: string; completed: boolean }[] = [];

  ngOnInit() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  addTask() {
    if (this.newTask.trim().length < 3) {
      alert('Please enter a task with at least 3 characters');
      return;
    }
    if (this.newTask.trim()) {
      this.tasks.push({ title: this.newTask, completed: false });
      this.newTask = '';
      this.updateLocalStorage();
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.updateLocalStorage();
  }

  toggleCompletion(task: { title: string; completed: boolean }) {
    task.completed = !task.completed;

    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
