import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterOptionsListsPage } from './filter-options-lists.page';

describe('FilterOptionsListsPage', () => {
  let component: FilterOptionsListsPage;
  let fixture: ComponentFixture<FilterOptionsListsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterOptionsListsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterOptionsListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
