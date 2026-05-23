import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [IonicModule, RouterLink],
  template: `
    <ion-button expand="block" [color]="buttonColor" [routerLink]="link" shape="round" class="main-btn">
      {{ label }}
    </ion-button>
  `,
  styles: [`
    .main-btn { 
      margin: 16px; 
      --border-radius: 10px; 
      font-weight: bold;
      text-transform: uppercase;
    }
  `]
})
export class NavButtonComponent {
  @Input() label: string = 'Próximo';
  @Input() link: string = '';
  @Input() buttonColor: string = 'dark';
}