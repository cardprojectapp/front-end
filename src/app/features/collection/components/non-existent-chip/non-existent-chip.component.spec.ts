import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonExistentChipComponent } from './non-existent-chip.component';

describe('NonExistentChipComponent', () => {
  let component: NonExistentChipComponent;
  let fixture: ComponentFixture<NonExistentChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonExistentChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NonExistentChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
