import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrMulti } from './corr-multi';

describe('CorrMulti', () => {
  let component: CorrMulti;
  let fixture: ComponentFixture<CorrMulti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrMulti],
    }).compileComponents();

    fixture = TestBed.createComponent(CorrMulti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
