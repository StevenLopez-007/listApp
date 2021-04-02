import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { DatabaseService } from '../../services/database-service'
import { ComponentsUtilsService } from '../../services/components-utils.service';
import { SwipeList } from '../../animations/swipeListAnimation'
import { CategoryCountProducts } from '../../model/categoryCountProduct';
import { Router } from '@angular/router';
import { LocalNotificationService } from '../../services/local-notification.service';
import { AddProductFromTab1Service } from 'src/services/add-product-from-tab1.service';
import { checkItemsDelete } from '../../animations/fadeInOutAnimation';
import { List } from '../../model/list';
import { FilterOptionsListsPage } from '../filter-options-lists/filter-options-lists.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [SwipeList],
  animations:[checkItemsDelete]
})
export class Tab1Page implements OnInit {
  optionsSelectAlert={
    header:'Seleccione los filtros'
  }

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
  lists: Array<any> = [];
  categories: Array<CategoryCountProducts> = [];

  nameList="";
  filters={
    state:4,
    orderDateBy:'asc'
  };
  searchList:boolean=false;

  @ViewChild('barSwipe', { read: ElementRef }) barSwipe: ElementRef;
  constructor(private dbService: DatabaseService, private componentsUtilsService: ComponentsUtilsService,
    private swipeList: SwipeList, private router: Router,
    private localNotificationService: LocalNotificationService,
    private addProductFromTab1Service:AddProductFromTab1Service) {
    // this.lists = new Array(50).fill({nameList:'Coca-cola',date:new Date(),id_Lista:0})
    // this.lists=[{nameList:'Coca1',date:new Date(),state:1,id_list:1},
    // {nameList:'Coca2',date:new Date().setDate(new Date().getDate()+5),state:2,id_list:2},
    // {nameList:'Coca3',date:new Date(),state:1,id_list:3},
    // {nameList:'Coca4',date:new Date(),state:3,id_list:4}]
    // this.categories = [{ nameCat: 'Churros', id_categoria: 1, countProducts: 5 }, { nameCat: 'Bebidas', id_categoria: 2, countProducts: 0 }]
  }

  ngOnInit() {
    this.dbService.dbState().subscribe(async (res) => {
      if (res) {
        await this.getLists();
        await this.getCategories();
      }
    })

    this.dbService.changeInList$.subscribe((sus)=>{
      if(sus){
        const index = sus['index'];
        this.lists[index]['state'] = sus['state'];
      }
    })

    this.dbService.changeInCategories$.subscribe((sus)=>{
      if(sus){
         this.categories.push(sus)
      }
    })
  }

  ionViewDidEnter() {
    this.swipeList.swipeAnimation(this.barSwipe);
    this.componentsUtilsService.setTabStatusBar('tab1');
  }
  ionViewWillEnter(){
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
    this.addProductFromTab1Service.addProduct({category:category,segment:1});
    this.router.navigate(['tabs/tab2'])
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

  async openFilterLists(){
    this.filters =await this.componentsUtilsService.presentPopoverFilterOptions(FilterOptionsListsPage,this.filters);
  }

  @HostListener('window:resize', ['$event'])
  onResize(ev) {
    this.swipeList.configSteps()
  }
}
