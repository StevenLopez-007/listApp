import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectCatPage } from './select-cat.page';

describe('SelectCatPage', () => {
  let component: SelectCatPage;
  let fixture: ComponentFixture<SelectCatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
