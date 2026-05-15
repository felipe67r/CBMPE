import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavButtonComponent } from './nav-button.component';

describe('NavButtonComponent', () => {
  let component: NavButtonComponent;
  let fixture: ComponentFixture<NavButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NavButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
