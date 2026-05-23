import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EvidenciasPage } from './evidencias.page';

describe('EvidenciasPage', () => {
  let component: EvidenciasPage;
  let fixture: ComponentFixture<EvidenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
