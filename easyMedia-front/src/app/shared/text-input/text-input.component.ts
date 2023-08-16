import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {

  @Input() inputTitle = '';
  @Output() textValue = new EventEmitter<any>();

  emitValue(value:any) {
    this.textValue.emit(value);    
  }

}
