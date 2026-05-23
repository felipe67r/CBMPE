import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule]
})
export class MainHeaderComponent {
  @Input() pageTitle: string = ''; 
  @Input() showBackButton: boolean = true; 
  @Input() isOnline: boolean = false;
}