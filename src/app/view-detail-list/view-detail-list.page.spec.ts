import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewDetailListPage } from './view-detail-list.page';

describe('ViewDetailListPage', () => {
  let component: ViewDetailListPage;
  let fixture: ComponentFixture<ViewDetailListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDetailListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
