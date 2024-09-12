import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardTailwindComponent } from './wizard-tailwind.component';

describe('WizardTailwindComponent', () => {
  let component: WizardTailwindComponent;
  let fixture: ComponentFixture<WizardTailwindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardTailwindComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WizardTailwindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
