import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../../services/database-service';
import { ComponentsUtilsService } from '../../services/components-utils.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Product } from 'src/model/product';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.page.html',
  styleUrls: ['./search-product.page.scss'],
  animations: [
    trigger('animationSearchProd1',
      [
        transition(':enter', [style({ opacity: 0 }), animate('0.12s ease-out', style({ opacity: 1 }))]),
        transition(':leave', [style({ opacity: 1 }), animate('0.12s ease-in', style({ opacity: 0 }))])
      ]
    ),

    trigger('animationSearchProd2',
    [
      transition(':enter',[style({opacity:0}),animate('0.12s ease-out',style({opacity:1}))]),
      transition(':leave',[style({opacity:1}),animate('0.12s ease-in',style({opacity:0}))])
    ]
    )
  ]
})
export class SearchProductPage implements OnInit {
  @Input() productsAggregates:Array<Product[]> =[];
  products: Array<any> = [];
  productsFound: Array<Product[]> = [];
  // productsFound: Array<any> = [{name:'Coca cola1',precio:15.50,id_product:1},
  // {name:'Coca cola2',precio:15.50,id_product:2},
  // {name:'Coca cola3',precio:15.50,id_product:3},
  // {name:'Coca cola4',precio:15.50,id_product:4}];
  name: string = '';
  show1:boolean=false;
  show2:boolean=true;
  constructor(private db: DatabaseService, private modalController: ModalController,
    private componentsUtilsService: ComponentsUtilsService,) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss({
      products:this.products
    });
  }

  async searchProduct() {
    if (this.name.length > 0) {
      await this.componentsUtilsService.presentLoading1();
      await this.db.findProductByName(this.name);
      this.db.getProductsFound().subscribe(res => {
        this.productsFound = res;
      })
      await this.componentsUtilsService.dismissLoading1();
      if (!this.existProduct) {
        this.componentsUtilsService.presentToast1('No se encontró ningún producto.');
      }
    }
    else {
      this.componentsUtilsService.presentToast1('Ingrese el nombre del producto.')
    }
  }

  addProduct(product: Object) {
    if(this.checkProduct(product)){
      this.componentsUtilsService.presentToast1('Este producto ya fue agregado.')
    }
    else{
      this.products.push(product);
      this.cleanListProductsFound();
    }
  }

  deleteProduct(index: number) {
    const heigth = document.getElementById(`item${index}`).offsetHeight;
    document.getElementById(`item${index}`).animate([
      { height: `${heigth}px`, transform: 'translateX(0%)' },
      { height: '0px', transform: 'translateX(100%)' }
    ], { duration: 250 })
    setTimeout(() => { this.products.splice(index, 1); }, 250)
  }
  cleanListProductsFound() {
    // this.productsFound = [];
    this.name = '';
  }

  get existProduct() {
    return this.productsFound.length > 0;
  }

  checkProduct(product:Object){
    return this.productsAggregates.some((prod)=>{
      return prod['id_product'] == product['id_product'];
    })
  }
}
