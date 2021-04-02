import { Component, Input, OnInit, ViewChildren, QueryList, HostBinding } from '@angular/core';
import { IonCheckbox, ModalController, Platform } from '@ionic/angular';
import { DatabaseService } from '../../services/database-service';
import { ComponentsUtilsService } from '../../services/components-utils.service';
import { Product } from 'src/model/product';
import { checkItemsDelete, translateElement } from '../../animations/fadeInOutAnimation';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.page.html',
  styleUrls: ['./search-product.page.scss'],
  animations: [
    checkItemsDelete,
    translateElement]
})
export class SearchProductPage implements OnInit {
  @Input() productsAggregates: Array<Product[]> = [];
  @ViewChildren("ckeckBoxs") checkBoxs: QueryList<IonCheckbox>;

  editProd: boolean = false;
  productToEdit: number = -1;
  products: Array<any> = [];
  // [{name:'Coca cola1',precio:15.50,id_product:1,cantidad:1},
  // {name:'Coca cola2',precio:15.50,id_product:2,cantidad:1},
  // {name:'Coca cola3',precio:15.50,id_product:3,cantidad:1},
  // {name:'Coca cola4',precio:15.50,id_product:4,cantidad:1}];
  productsFound: Array<Product[]> = [];
  name: string = '';

  // multiDelete: boolean = false;

  showItem: Object = {
    item1: true,
    item2: false
  };

  productsToDelete: any[] = [];
  deleteAll: boolean = false;
  constructor(private db: DatabaseService, private modalController: ModalController,
    private componentsUtilsService: ComponentsUtilsService, private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.editProd) {
        this.edit(-1);
      }
    })
  }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss({
      products: this.products
    });
  }

  searchProduct() {
    this.db.dbState().subscribe(async (res) => {
      if (res) {
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
      } else {
        this.componentsUtilsService.presentToast1('No se puede conectar con las base de datos.')
      }
    })
  }

  edit(i: number) {
    this.editProd = !this.editProd
    if (this.editProd) {
      this.productToEdit = i;
    }
    else {
      this.productToEdit = i;
    }
  }

  setCantidad(ev: any) {
    if (this.editProd) {
      var cantidad = ev.detail.value;
      this.products[this.productToEdit]['cantidad'] = cantidad == '' ? 1 : parseInt(cantidad);
    }
  }

  addProduct(product: Object) {
    if (this.checkProduct(product)) {
      this.componentsUtilsService.presentToast1('Este producto ya fue agregado.')
    }
    else {
      product['cantidad'] = 1;
      this.products.push(product);
      this.cleanListProductsFound();
    }
  }
  cleanListProductsFound() {
    // this.productsFound = [];
    this.name = '';
  }

  get existProduct() {
    return this.productsFound.length > 0;
  }

  checkProduct(product: Object) {
    return this.productsAggregates.some((prod) => {
      return prod['id_product'] == product['id_product'];
    })
  }

  addToDelete(id: number) {
    if (this.productsToDelete.includes(id)) {
      this.productsToDelete = this.productsToDelete.filter((value) => value != id)
    } else {
      this.productsToDelete.push(id);
    }
    // console.log(this.productsToDelete)
  }

  activateMultiDelete() {
    // this.multiDelete = true;
    this.showItem['item1'] = false;
  }

  closeMultiDelete() {
    // this.multiDelete = false;
    this.showItem['item2'] = false;
    this.productsToDelete = []
  }

  cleanAllDelete() {
    this.checkedCheckBoxs(false)
    this.deleteAll = false;
    this.productsToDelete = [];
  }

  selectAll() {
    this.deleteAll = true;
    this.checkedCheckBoxs(true);
    this.productsToDelete = [];
    this.products.forEach((item, index) => {
      this.productsToDelete.push(index)
    });
  }

  deleteProducts() {
    this.products = this.products.filter((value, index) => {
      return !this.productsToDelete.includes(index);
    });
    this.productsToDelete = [];
    this.closeMultiDelete();
    this.checkedCheckBoxs(false);
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
