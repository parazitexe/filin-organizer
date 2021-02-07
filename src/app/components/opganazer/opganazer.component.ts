import {Component, OnInit} from '@angular/core';
import {DateService} from '../../shared/date.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task, TasksService} from '../../shared/tasks.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-opganazer',
  templateUrl: './opganazer.component.html',
  styleUrls: ['./opganazer.component.scss']
})
export class OpganazerComponent implements OnInit {

  form: FormGroup;
  tasks: Task[] = [];

  constructor(public dateService: DateService, public tasksService: TasksService) {
  }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value)),
    ).subscribe(tasks => this.tasks = tasks);

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }


  submit(): void {
    const {title} = this.form.value;
    console.log(title);
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    };
    this.tasksService.create(task).subscribe(createdTask => {
      this.form.reset();
      this.tasks.push(createdTask);
    }, error => console.log);
  }

  remove(task: Task): void {
    this.tasksService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    }, error => {
      console.log(error);
    });
  }

}
