import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from "rxjs";


@Pipe({
  name: 'moment',
  pure: false
})
export class MomentPipe implements PipeTransform {
  transform(value: moment.Moment, format: string = 'MMM YYYY'): string {

    return value.format(format);
  }

}
