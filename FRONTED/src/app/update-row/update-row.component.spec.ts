import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRowComponent } from './update-row.component';

describe('UpdateRowComponent', () => {
  let component: UpdateRowComponent;
  let fixture: ComponentFixture<UpdateRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRowComponent]
    });
    fixture = TestBed.createComponent(UpdateRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
