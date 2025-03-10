import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginandregisterComponent } from './loginandregister.component';

describe('LoginandregisterComponent', () => {
  let component: LoginandregisterComponent;
  let fixture: ComponentFixture<LoginandregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginandregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginandregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
