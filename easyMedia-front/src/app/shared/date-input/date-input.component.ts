import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent {

  @Output() dateValue = new EventEmitter<any>();
  @Output() clearValues = new EventEmitter<any>();

  emitDate(value:any) {
    this.dateValue.emit(value);
  }

  clearFilter() {
    let dateInput = (<HTMLInputElement>document.getElementById('date'));
    dateInput.value = ''
    this.clearValues.emit(true);
  }

}
