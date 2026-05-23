import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from './components/button/button.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { CardComponent } from './components/card/card.component';

const SHARED_COMPONENTS = [
  ButtonComponent,
  FormFieldComponent,
  CardComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ...SHARED_COMPONENTS
  ],
  exports: [
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }
