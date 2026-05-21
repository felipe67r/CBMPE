import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonButton, RouterModule]
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() color: 'amarelo-logo' | 'azul-logo' | 'vermelho-logo' | 'cinza-cbmpe' = 'azul-logo';
  @Input() type: 'button' | 'submit' | 'link' = 'button';
  @Input() disabled: boolean = false;
  @Input() link: string = '';
  @Output() onClick = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
