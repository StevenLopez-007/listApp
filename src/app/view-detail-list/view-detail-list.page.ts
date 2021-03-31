import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../../services/database-service';
import { ComponentsUtilsService } from '../../services/components-utils.service';
import { DetailList } from '../../model/detailList';
import { checkItemsDelete, translateElement } from '../../animations/fadeInOutAnimation';
import { IonCheckbox } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-view-detail-list',
  templateUrl: './view-detail-list.page.html',
  styleUrls: ['./view-detail-list.page.scss'],
  animations: [checkItemsDelete, translateElement],
})
export class ViewDetailListPage implements OnInit {
  @ViewChildren("ckeckBoxs") checkBoxs: QueryList<IonCheckbox>;
  // products;
  detailList: any[] = [];
  dataList: Object = {};

  showItem: Object = {
    item1: true,
    item2: false
  };
  multiDelete: boolean = false;

  productsToDelete: any[] = [];
  deleteAll: boolean = false;

  search: string = '';

  constructor(private router: Router, private route: ActivatedRoute,
    private db: DatabaseService, private componentsUtilsService: ComponentsUtilsService,
    private cdr: ChangeDetectorRef, private splashScreen: SplashScreen
  ) {
    // this.detailList = [
    //   { name: 'Coca-Cola1', precio: 15.20, date: new Date(), id_detail_list: 1,cantidad:1 },
    //   { name: 'Coca-Cola2', precio: 15.20, date: new Date(), id_detail_list: 2,cantidad:1},
    //   { name: 'Coca-Cola3', precio: 15.20, date: new Date(), id_detail_list: 3,cantidad:1 },
    //   { name: 'Coca-Cola4', precio: 15.20, date: new Date(), id_detail_list: 4,cantidad:1 },
    //   { name: 'Coca-Cola5', precio: 15.20, date: new Date(), id_detail_list: 5,cantidad:1 },
    //   { name: 'Coca-Cola6', precio: 15.20, date: new Date(), id_detail_list: 6,cantidad:1 }]
    // this.dataList = {
    //   date: this.detailList[0]['date'],
    //   nameList: "Lista de Bigcola",
    //   state:1
    // }
  }

  async ngOnInit() {
    await this.getDetailList();
  }

  ionViewDidEnter() {
    setTimeout(() => { this.splashScreen.hide(); }, 600)
    this.componentsUtilsService.setTabStatusBar('tab2');
    this.configTimeLapse();
  }

  close() {
    this.router.navigate(['/'])
  }

  async viewProducts(){
    this.detailList = await this.componentsUtilsService.presentModalViewProductsDetail(this.detailList);
  }

  getDetailList() {
    this.db.dbState().subscribe(async (res) => {
      if (res) {
        var idList = this.route.snapshot.paramMap.get('idList');
        // console.log(idList)
        await this.componentsUtilsService.presentLoading1();
        try {
          await this.db.loadDetailLists(idList)
          this.db.getDetailLists().subscribe((res) => {
            // console.log(res)
            this.detailList = res;
            this.dataList = {
              date: res[0]['date'],
              nameList: res[0]['nameList'],
              idList: res[0]['id_list'],
              state:res[0]['state']
            }
            this.cdr.detectChanges();
          });
          this.componentsUtilsService.dismissLoading1();
        } catch (e) {
          
          await this.componentsUtilsService.dismissLoading1();
          await this.componentsUtilsService.presentToast1('Ocurrió un error al cargar el detalle de la lista.')
          this.close();
        }
        // console.log(this.detailList)
      }
    })
  }

  async updateList(state:number){
    if(await this.db.updateList(this.dataList['idList'],state)){
      this.dataList['state']=state;
      await this.componentsUtilsService.dismissLoading1();
      await this.componentsUtilsService.presentToast1(`El estado de la lista ha sido actualizado`);
    }
  }


  async deleteList() {
    if(await this.db.deleteList(this.dataList['idList'])){
      this.close();
    }
  }

  
  configTimeLapse() {
    const width = document.getElementById("circle1").offsetWidth;
    const circle1 = document.getElementById("circle1");
    const circle2 = document.getElementById("circle2");
    const circle3 = document.getElementById("circle3");

    circle1.style.height = `${width}px`;
    circle2.style.height = `${width}px`;
    circle3.style.height = `${width}px`;

  }

  @HostListener('window:resize', ['event'])
  onResize() {
    this.configTimeLapse();
  }

}
