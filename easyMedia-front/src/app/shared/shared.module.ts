import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { DateInputComponent } from './date-input/date-input.component';
import { TextInputComponent } from './text-input/text-input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CardComponent,
    DateInputComponent,
    TextInputComponent,
    NavbarComponent
  ],
  exports: [
    CardComponent,
    DateInputComponent,
    TextInputComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
