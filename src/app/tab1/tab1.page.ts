import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { DatabaseService } from '../../services/database-service'
import { ComponentsUtilsService } from '../../services/components-utils.service';
import { SwipeList } from '../../animations/swipeListAnimation'
import { DetailList } from '../../model/detailList';
import { CategoryCountProducts } from '../../model/categoryCountProduct';
import { Router } from '@angular/router';
import { LocalNotificationService } from '../../services/local-notification.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [SwipeList]
})
export class Tab1Page implements OnInit {
  // @ViewChild('refreshList') refreshList:IonRefresher;
  contador: number = 0;
  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 8,
    slidesPerView: 2.5,
    freeMode: true,
    loop: false
  };
  lists: Array<DetailList> = [];
  categories: Array<CategoryCountProducts> = [];
  @ViewChild('barSwipe', { read: ElementRef }) barSwipe: ElementRef;
  constructor(private dbService: DatabaseService, private componentsUtilsService: ComponentsUtilsService,
    private swipeList: SwipeList, private router: Router,
    private localNotificationService: LocalNotificationService,
    private splashScreen:SplashScreen) {
    // this.lists = new Array(50).fill({nameList:'Coca-cola',date:new Date(),id_Lista:0})
    // this.categories = [{ nameCat: 'Churros', id_categoria: 1, countProducts: 5 }, { nameCat: 'Bebidas', id_categoria: 2, countProducts: 0 }]
  }

  ngOnInit() {
    this.dbService.dbState().subscribe(async (res) => {
      if (res) {
        await this.getLists();
        await this.getCategories();
      }
    })
  }

  ionViewDidEnter() {
    this.swipeList.swipeAnimation(this.barSwipe);
    this.splashScreen.hide();
    
  }
  ionViewWillEnter(){
    this.componentsUtilsService.setTabStatusBar('tab1');
  }

  async getLists() {
    await this.dbService.loadLists();
    this.dbService.getLists().subscribe(async (res) => {
      this.lists = res;
      // await this.refreshList.complete();
    })
  }

  async getCategories(ev: any = null) {
    await this.dbService.loadCategoriesWithCountProduct();
    this.dbService.getCategoriesWithCount().subscribe((categories) => {
      this.categories = categories;
    });
  }

  addProduct(category: Object) {
    this.router.navigate(['tabs/tab2'], { state: { data: { category: category, segment: 1 } } })
  }
  get listEmpty() {
    return this.lists.length <= 0;
  }

  get categoriesEmpty() {
    return this.categories.length <= 0;
  }
  async configNotication(list:Object) {
    if (await this.componentsUtilsService.presentAlert1('Info', '¿Programar recordatorio?')) {
      const date = await this.componentsUtilsService.pickDate();
      if (date != 'cancel') {
        const config = ['Recordatorio', `Has programado un recordatorio para la lista "${list['nameList']}".`, date, list['id_list']] as const;
        this.localNotificationService.configNotificationDelay(...config)
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(ev) {
    this.swipeList.configSteps()
  }
}
