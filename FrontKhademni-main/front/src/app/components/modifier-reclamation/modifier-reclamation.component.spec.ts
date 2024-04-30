import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierReclamationComponent } from './modifier-reclamation.component';

describe('ModifierReclamationComponent', () => {
  let component: ModifierReclamationComponent;
  let fixture: ComponentFixture<ModifierReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierReclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
