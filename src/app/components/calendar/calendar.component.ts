import {Component, OnInit} from '@angular/core';
import {DateService} from '../../shared/date.service';
import * as moment from 'moment';

interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[];

  constructor(private dateService: DateService) {
  }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this));
  }

  generate(now: moment.Moment): void {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7).fill(0).map(() => {
          const value: moment.Moment = date.add(1, 'day').clone();
          const active: boolean = moment().isSame(value, 'date');
          const disabled: boolean = !now.isSame(value, 'month');
          const selected: boolean = now.isSame(value, 'date');
          return {
            value,
            active,
            disabled,
            selected
          };
        })
      });
    }
    this.calendar = calendar;
  }

  select(day: moment.Moment): void {
    this.dateService.changeDate(day);
  }
}

