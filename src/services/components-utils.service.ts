import { ViewProductsDetailsPage } from './../app/view-products-details/view-products-details.page';
import { ViewProductsPage } from './../app/view-products/view-products.page';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { SelectCatPage } from '../app/select-cat/select-cat.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SearchProductPage } from '../app/search-product/search-product.page';
import { PermissionService } from './permission.service';
import {DatePicker} from '@ionic-native/date-picker/ngx';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ComponentsUtilsService {
  presentPopoverFilterOptionsData=new BehaviorSubject(null);

  constructor(private toastController: ToastController,
    private modalController: ModalController,
    private statusBar: StatusBar,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private permissionService:PermissionService,
    private datePicker:DatePicker,
    private popoverController: PopoverController
    ) { }


  //Toast methods          
  async presentToast1(message: string) {
    const toast = await this.toastController.create({
      duration: 3000,
      message: message,
      cssClass: 'toastClass1',
    });

    await toast.present();
  }

  //Modal methods
  async presentModalSelectCat(categories: any, category: any) {
    const modal = await this.modalController.create({
      component: SelectCatPage,
      componentProps: {
        categories: categories,
        category: category
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    return data.category;
  }

  async presentModalViewProducts(products: any, filterByCat: boolean) {
    const modal = await this.modalController.create({
      component: ViewProductsPage,
      componentProps: {
        products: products,
        filterByCat: filterByCat
      }
    });

    await modal.present()
  }

  async presentModalSearchProduct(productsAggregates: Array<any>) {
    const modal = await this.modalController.create({
      component: SearchProductPage,
      componentProps: {
        productsAggregates: productsAggregates
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    return data.products;
  }

  async presentModalViewProductsDetail(products:Array<any>){
    const modal = await this.modalController.create({
      component:ViewProductsDetailsPage,
      componentProps:{products:products},

    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    return data.products;
  }

  //loading methods
  async presentLoading1() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'circular',
      cssClass: 'loadingClass1'
    });

    await loading.present();
  }

  async dismissLoading1() {
    return this.loadingController.dismiss();
  }

  //Popover Methos
  async presentPopoverFilterOptions(component:any,props:any){
    const popover = await this.popoverController.create({
      component:component,
      componentProps:{
        filters:props
      },
      showBackdrop:true,
      keyboardClose:true,
      backdropDismiss:true
    });

    await popover.present();
    await popover.onDidDismiss();
    return this.presentPopoverFilterOptionsData.getValue();
  }
  //Alert methods
  async presentAlert1(title:string,message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      // enterAnimation:this.animationAlert1.enterAnimation,
      // leaveAnimation:this.animationAlert1.leaveAnimation,
      buttons: [
        {
          text: 'Cancelar',
          handler:() => {
            alert.dismiss(false);
            return false;
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            alert.dismiss(true);
            return false;
          }
        }
      ]
    });

    await alert.present();

    const {data}= await alert.onDidDismiss();
    return data
  }

  async presentAlertOpenConfig(message:string){
    const alert = await this.alertController.create({
      header:'Info',
      message:message,
      // enterAnimation:this.animationAlert1.enterAnimation,
      // leaveAnimation:this.animationAlert1.leaveAnimation,
      buttons: [
        {
          text: 'Cancelar',
          role:'cancel'
        },
        {
          text: 'Aceptar',
          handler: async () => {
            await this.permissionService.openConfig().catch(async (e)=>{
              await this.presentToast1('Ocurrió un error al ingresar a las configuraciones.')
            });
          }
        }
      ]
    });

    await alert.present();
  }

  //Select Date
  async pickDate(){
    const date = await this.datePicker.show({
      date:new Date(),
      titleText:'¿Cuando desea recordar esta lista?',
      mode:'datetime',
      okText:'Aceptar',
      cancelText:'Cancelar',
      minDate:new Date().getTime(),
      androidTheme:this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).catch(async (e)=>{
      if(e!='cancel'){
        await this.presentToast1('Error al obtener la fecha.');
      }
      return 'cancel'
    });

    return date;
  }


  //other utils
  setTabStatusBar(tab: any) {
    switch (tab) {
      case 'tab1': {
        this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString('');
        this.statusBar.styleLightContent();
        break;
      }

      case 'tab2': {
        this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString('');
        this.statusBar.styleLightContent();
        break;
      }
    }
  }
}
