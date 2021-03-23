import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../../services/database-service';
import { ComponentsUtilsService } from '../../services/components-utils.service';
import { DetailList } from '../../model/detailList';
import { checkItemsDelete,translateElement } from '../../animations/fadeInOutAnimation';
import { IonCheckbox } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-view-detail-list',
  templateUrl: './view-detail-list.page.html',
  styleUrls: ['./view-detail-list.page.scss'],
  animations: [checkItemsDelete,translateElement],
})
export class ViewDetailListPage implements OnInit {
  @ViewChildren("ckeckBoxs") checkBoxs: QueryList<IonCheckbox>;
  // products;
  detailList: DetailList[] = [];
  dataList: Object = {};

  showItem: Object = {
    item1: true,
    item2: false
  };
  multiDelete: boolean = false;

  productsToDelete: any[] = [];
  deleteAll: boolean = false;

  search:string='';
  constructor(private router: Router, private route: ActivatedRoute, 
              private db: DatabaseService, private componentsUtilsService: ComponentsUtilsService,
              private cdr: ChangeDetectorRef,private splashScreen:SplashScreen
  ) {
    // this.detailList = [
    //   { name: 'Coca-Cola1', precio: 15.20, date: new Date(), id_detail_list: 1 },
    //   { name: 'Coca-Cola2', precio: 15.20, date: new Date(), id_detail_list: 2 },
    //   { name: 'Coca-Cola3', precio: 15.20, date: new Date(), id_detail_list: 3 },
    //   { name: 'Coca-Cola4', precio: 15.20, date: new Date(), id_detail_list: 4 },
    //   { name: 'Coca-Cola5', precio: 15.20, date: new Date(), id_detail_list: 5 },
    //   { name: 'Coca-Cola6', precio: 15.20, date: new Date(), id_detail_list: 6 }]
    // this.dataList = {
    //   date: this.detailList[0]['date'],
    //   nameList: this.detailList[0]['nameList']
    // }
  }

  async ngOnInit() {
    await this.getDetailList();
  }

   ionViewDidEnter(){
    this.componentsUtilsService.setTabStatusBar('tab2');
    this.splashScreen.hide();
  }

  close() {
    this.router.navigate(['/'])
  }

   getDetailList() {
    this.db.dbState().subscribe(async (res) => {
      if (res) {
        var idList = this.route.snapshot.paramMap.get('idList');
        console.log(idList)
        await this.db.loadDetailLists(idList);
        this.db.getDetailLists().subscribe((res) => {
          this.detailList = res;
          this.dataList = {
            date: res[0]['date'],
            nameList: res[0]['nameList']
          }
          this.cdr.detectChanges();
        });
        console.log(this.detailList)
      }
    })
  }

  configGesturePressStart(ev: any) {
    this.multiDelete = true;
    this.showItem['item1'] = false;
  }
  addToDelete(id: number) {
    if (this.productsToDelete.includes(id)) {
      this.productsToDelete = this.productsToDelete.filter((value) => value != id)
    } else {
      this.productsToDelete.push(id);
    }
  }

  addAllToDelete() {
    this.deleteAll = true;
    this.checkedCheckBoxs(true);
    this.productsToDelete = [];
    this.detailList.forEach((item) => {
      this.productsToDelete.push(item['id_detail_list'])
    });
  }

  cleanDeleteAll() {
    this.checkedCheckBoxs(false)
    this.deleteAll = false;
    this.productsToDelete = [];
  }

  closeMultiDelete() {
    this.multiDelete = false;
    this.showItem['item2'] = false;
    this.productsToDelete = [];
  }

  async deleteProducts() {

    const choice = await this.componentsUtilsService
      .presentAlert1('Info.', this.productsToDelete.length <= 1 ? '¿Desea eliminar el producto?' : '¿Desea eliminar los productos?');

    if (choice) {
      await this.db.deleteProductsFromDetailList(this.productsToDelete);
      this.closeMultiDelete();
       this.getDetailList();
    }

  }

  checkedCheckBoxs(checked: boolean) {
    this.checkBoxs['_results'].forEach((item) => {
      item['checked'] = checked
    });
  }

  animationEnd(ev: AnimationEvent, item: number) {
    if (item == 1) {
      if (ev['toState'] == 'void') {
        if (!this.showItem['item2']) {
          this.showItem['item2'] = true;
        }
      }
    }else{
      if(ev['toState']=='void'){
        if (!this.showItem['item1']) {
          this.showItem['item1'] = true;
        }
      }
    }
  }

  get allChecked() {
    if (this.checkBoxs.length > 0) {
      return this.checkBoxs['_results'].every((currentValue) => {
        return currentValue['checked'] == true;
      });
    } else {
      return false;
    }
  }
}
