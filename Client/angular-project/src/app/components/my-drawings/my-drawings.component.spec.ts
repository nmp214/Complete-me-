import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDrawingsComponent } from './my-drawings.component';

describe('MyDrawingsComponent', () => {
  let component: MyDrawingsComponent;
  let fixture: ComponentFixture<MyDrawingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDrawingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyDrawingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
