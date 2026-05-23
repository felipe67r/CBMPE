import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter } from '@ionic/angular/standalone';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { NavButtonComponent } from 'src/app/components/nav-button/nav-button.component';

@Component({
  selector: 'app-conclusao',
  templateUrl: './conclusao.page.html',
  styleUrls: ['./conclusao.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MainHeaderComponent, NavButtonComponent, IonFooter]
})
export class ConclusaoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
