import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrUni } from './corr-uni';

describe('CorrUni', () => {
  let component: CorrUni;
  let fixture: ComponentFixture<CorrUni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrUni],
    }).compileComponents();

    fixture = TestBed.createComponent(CorrUni);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
