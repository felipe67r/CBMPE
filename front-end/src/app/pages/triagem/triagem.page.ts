import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonToolbar, IonFooter, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea } from '@ionic/angular/standalone';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { NavButtonComponent } from 'src/app/components/nav-button/nav-button.component';

@Component({
  selector: 'app-triagem',
  templateUrl: './triagem.page.html',
  styleUrls: ['./triagem.page.scss'],
  standalone: true,
  imports: [IonContent, IonToolbar, CommonModule, FormsModule, MainHeaderComponent, NavButtonComponent, IonFooter, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea]
})
export class TriagemPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
