import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveImageComponent } from './save-image.component';

describe('SaveImageComponent', () => {
  let component: SaveImageComponent;
  let fixture: ComponentFixture<SaveImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
