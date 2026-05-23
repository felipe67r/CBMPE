import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink],
  template: `
    <ion-button
      [expand]="expand"
      [color]="color"
      [disabled]="disabled"
      [routerLink]="routerLink || null"
      (click)="onClick()"
      shape="round"
      class="custom-btn">
      {{ label }}
    </ion-button>
  `,
  styles: [`
    .custom-btn {
      margin: 12px 16px;
      --border-radius: 10px;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 14px;
      --padding-start: 24px;
      --padding-end: 24px;
      --padding-top: 12px;
      --padding-bottom: 12px;
    }
  `]
})
export class CustomButtonComponent {
  @Input() label: string = 'Botão';
  @Input() color: string = 'primary'; // primary, secondary, danger, success, warning
  @Input() expand: string = 'block'; // block, full
  @Input() disabled: boolean = false;
  @Input() routerLink: string | string[] | null = null;
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    if (!this.disabled && !this.routerLink) {
      this.buttonClick.emit();
    }
  }
}
