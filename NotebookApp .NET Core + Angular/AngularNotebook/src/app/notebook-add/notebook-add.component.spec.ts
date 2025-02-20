import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookAddComponent } from './notebook-add.component';

describe('NotebookAddComponent', () => {
  let component: NotebookAddComponent;
  let fixture: ComponentFixture<NotebookAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotebookAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotebookAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
