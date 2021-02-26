import { ViewProductsPage } from './../app/view-products/view-products.page';
import { Injectable } from '@angular/core';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import { SelectCatPage } from '../app/select-cat/select-cat.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SearchProductPage } from '../app/search-product/search-product.page';

@Injectable({
  providedIn: 'root'
})
export class ComponentsUtilsService {

  constructor(private toastController: ToastController,
              private modalController:ModalController,
              private statusBar:StatusBar,
              private loadingController: LoadingController) { }

  async presentToast1(message:string){
    const toast = await this.toastController.create({
      duration:3000,
      message:message,
      cssClass:'toastClass1'
    });

    await toast.present();
  }

  async presentModalSelectCat(categories:any,category:any){
    const modal = await this.modalController.create({
      component:SelectCatPage,
      componentProps:{
        categories:categories,
        category:category
      },
    });

    await modal.present();

    const {data} = await modal.onWillDismiss();
    return data.category;
  }

  async presentModalViewProducts(products:any,filterByCat:boolean){
    const modal = await this.modalController.create({
      component:ViewProductsPage,
      componentProps:{
        products:products,
        filterByCat:filterByCat
      }
    });

    await modal.present()
  }

  async presentModalSearchProduct(productsAggregates:Array<any>){
    const modal = await this.modalController.create({
      component:SearchProductPage,
      componentProps:{
        productsAggregates:productsAggregates
      }
    });

    await modal.present();

    const {data} = await modal.onWillDismiss();
    return data.products;
  }

  async presentLoading1(){
    const loading = await this.loadingController.create({
      message:'Cargando...',
      spinner:'circular',
      cssClass:'loadingClass1'
    });

    await loading.present();
  }

  async dismissLoading1(){
    await this.loadingController.dismiss();
  }
  setTabStatusBar(tab:any){
    switch(tab){
      case 'tab1':{
        this.statusBar.backgroundColorByHexString('#040C3A');
        this.statusBar.styleLightContent();
        break;
      }

      case 'tab2':{
        this.statusBar.backgroundColorByHexString('#041266');
        this.statusBar.styleLightContent();
        break;
      }
    }
  }
}