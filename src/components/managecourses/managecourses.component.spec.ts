import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecoursesComponent } from './managecourses.component';

describe('ManagecoursesComponent', () => {
  let component: ManagecoursesComponent;
  let fixture: ComponentFixture<ManagecoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagecoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagecoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
