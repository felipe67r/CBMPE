import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TriagemPage } from './triagem.page';

describe('TriagemPage', () => {
  let component: TriagemPage;
  let fixture: ComponentFixture<TriagemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TriagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
