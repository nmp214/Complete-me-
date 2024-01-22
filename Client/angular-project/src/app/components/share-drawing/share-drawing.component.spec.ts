import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDrawingComponent } from './share-drawing.component';

describe('ShareDrawingComponent', () => {
  let component: ShareDrawingComponent;
  let fixture: ComponentFixture<ShareDrawingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareDrawingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
