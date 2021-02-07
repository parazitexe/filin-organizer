import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";

export interface Task {
  title: string;
  id?: string;
  date: string;
}

export interface CreateResponse {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  static url = 'https://filin-organizer-default-rtdb.firebaseio.com/tasks';

  constructor(private htttp: HttpClient) {

  }

  load(date: moment.Moment): Observable<Task[]> {
    return this.htttp.get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`).pipe(
      map(tasks => {
        if (!tasks) {
          return [];
        } else {
          return Object.keys(tasks).map(key => ({...tasks[key], id: key}));
        }
      })
    );
  }

  create(task: Task): Observable<Task> {
    return this.htttp.post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task).pipe(
      map((res) => {
        return {...task, id: res.name};
      }),
    );
  }

  remove(task: Task): Observable<void> {
    return this.htttp.delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`);
  }
}
