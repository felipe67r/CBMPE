import { Component, Input, forwardRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  template: `
    <ion-item [class]="'input-item ' + (invalid ? 'input-invalid' : '')">
      <ion-label position="stacked">{{ label }}</ion-label>
      <ion-input
        [type]="type"
        [placeholder]="placeholder"
        [readonly]="readonly"
        [disabled]="disabled"
        [(ngModel)]="value"
        (ngModelChange)="onChange($event)"
        (blur)="onTouched()"
        required>
      </ion-input>
    </ion-item>
    <div *ngIf="invalid && errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  `,
  styles: [`
    .input-item {
      --padding-start: 8px;
      --padding-end: 8px;
      border-bottom: 2px solid #e0e0e0;
      margin-bottom: 16px;
    }

    .input-item.input-invalid {
      border-bottom-color: #ed3237;
    }

    .error-message {
      color: #ed3237;
      font-size: 12px;
      padding: 0 16px;
      margin-top: -8px;
      margin-bottom: 8px;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() label: string = 'Campo';
  @Input() type: string = 'text'; // text, password, email, number
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() invalid: boolean = false;
  @Input() errorMessage: string = '';

  value: any;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
