import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../../services/database-service';
import { ComponentsUtilsService } from '../../services/components-utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonRefresher } from '@ionic/angular';
import { convertDeepLinkEntryToJsObjectString } from '@ionic/app-scripts/dist/deep-linking/util';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  @ViewChild('refresher') refresher: IonRefresher
  categories: any[] = [];
  // categories: any[] = [
  //   { id_categoria: 1, nameCat: 'Comida' },
  //   { id_categoria: 2, nameCat: 'Soda' },
  //   { id_categoria: 3, nameCat: 'Refresco' },
  //   { id_categoria: 4, nameCat: 'Frituras' }];

  category: Object = {};

  products: Array<any> = [];
  // products = [{
  //   name: 'Pepsi',
  //   precio: 4.5,
  //   cat: 1,
  //   nameCat:'Refresco'
  // },
  // {
  //   name:'Coca Cola',
  //   precio:7.85,
  //   cat:1,
  //   nameCat:'Refresco'
  // },
  // {
  //   name:'Churro',
  //   precio:7,
  //   cat:2,
  //   nameCat:'Comida'
  // }]
  productForm: FormGroup;
  constructor(private databaseService: DatabaseService,
    private componentsUtilsService: ComponentsUtilsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategories();
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(32)]],
      precio: [0, [Validators.required, Validators.pattern(/^([0-9]+\.?[0-9]{0,2})$/)]]
    })
  }

  get categoryEmpty() {
    return Object.keys(this.category).length == 0;
  }

  getCategories() {
    this.databaseService.dbState().subscribe(async (res) => {
      if (res) {
        await this.databaseService.loadCategories();
        this.databaseService.getCategories().subscribe(async item => {
          this.categories = item;
          await this.refresher.complete();
        });
      }
    });
  }

  async selectCat() {
    this.category = await this.componentsUtilsService.presentModalSelectCat(this.categories, this.category);
  }

  async viewProducts() {
    await this.componentsUtilsService.presentModalViewProducts(this.products,true)
  }

  async addProduct() {
    if (await this.validateForm()) {
      this.products.push({
        name: this.productForm.value.name,
        precio: this.productForm.value.precio,
        cat: this.category['id_categoria'],
        nameCat:this.category['nameCat']
      });
      this.productForm.reset();
      await this.componentsUtilsService.presentToast1('¡Producto agregado!')
    }
  }

  async saveProduct() {
    if (this.products.length > 0) {
      this.databaseService.addProduct(this.products);
      this.reset();
    } else {
      if (await this.validateForm()) {
        await this.databaseService.addProduct([{ name: this.productForm.value.name, precio: this.productForm.value.precio, cat: this.category['id_categoria'] }]);
        this.reset();
      }
    }
  }

  async validateForm() {
    if (!this.categoryEmpty) {
      if (this.productForm.valid) {
        return true;
      }
      else {
        await this.componentsUtilsService.presentToast1('Cumpla con todos los requisitos.')
        return false;
      }
    }
    else {
      await this.componentsUtilsService.presentToast1('Seleccione una categoría.')
      return false;
    }
  }

  reset() {
    this.productForm.reset();
    this.category = {};
    this.products = []
  }
}