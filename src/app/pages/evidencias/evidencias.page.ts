import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-evidencias',
  templateUrl: './evidencias.page.html',
  styleUrls: ['./evidencias.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EvidenciasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
