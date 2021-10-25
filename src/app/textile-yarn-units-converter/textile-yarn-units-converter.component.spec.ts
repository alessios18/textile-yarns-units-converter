import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextileYarnUnitsConverterComponent } from './textile-yarn-units-converter.component';

describe('TextileYarnUnitsConverterComponent', () => {
  let component: TextileYarnUnitsConverterComponent;
  let fixture: ComponentFixture<TextileYarnUnitsConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextileYarnUnitsConverterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextileYarnUnitsConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
