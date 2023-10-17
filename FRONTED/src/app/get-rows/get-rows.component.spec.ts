import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRowsComponent } from './get-rows.component';

describe('GetRowsComponent', () => {
  let component: GetRowsComponent;
  let fixture: ComponentFixture<GetRowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetRowsComponent]
    });
    fixture = TestBed.createComponent(GetRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
