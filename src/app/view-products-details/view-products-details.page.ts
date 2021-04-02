import { Component, Input, OnInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { IonCheckbox, ModalController, IonInput } from '@ionic/angular';
import { checkItemsDelete, translateElement } from '../../animations/fadeInOutAnimation';
import { ComponentsUtilsService } from '../../services/components-utils.service';
import { DatabaseService } from '../../services/database-service';

@Component({
  selector: 'app-view-products-details',
  templateUrl: './view-products-details.page.html',
  styleUrls: ['./view-products-details.page.scss'],
  animations:[checkItemsDelete,translateElement]
})
export class ViewProductsDetailsPage implements OnInit {
  @ViewChildren("ckeckBoxs") checkBoxs: QueryList<IonCheckbox>;
  @Input()products: Array<any> = [];

  editProd: boolean = false;
  productToEdit: number = -1;

  name: string = '';

  showItem: Object = {
    item1: true,
    item2: false
  };

  productsToDelete: any[] = [];
  deleteAll: boolean = false;

  productError:any[]=[];
  constructor(private modalController: ModalController,private componentsUtilsService:ComponentsUtilsService,
              private db:DatabaseService) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss({
      products: this.products
    });
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

  async setCantidad(input: IonInput) {
    if (this.editProd) {
      const cantidad = input.value == '' ? 1 : typeof input.value=='string'?parseInt(input.value):input.value;
      if(await this.db.updateCantidadDetailList(this.products[this.productToEdit]['id_detail_list'],cantidad)){
        await this.componentsUtilsService.presentToast1('Cantidad actualizada');
        this.products[this.productToEdit]['cantidad'] = cantidad;
        this.editProd=false;
      }
    }
  }


  //Animation and Delete Configuration

  addToDelete(id: number) {
    if (this.productsToDelete.includes(id)) {
      this.productsToDelete = this.productsToDelete.filter((value) => value != id)
    } else {
      this.productsToDelete.push(id);
    }
    console.log(this.productsToDelete)
  }

  activateMultiDelete() {
    this.showItem['item1'] = false;
  }

  closeMultiDelete() {
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
    console.log(this.productsToDelete)
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

  checkedCheckBoxs(checked: boolean) {
    this.checkBoxs['_results'].forEach((item) => {
      item['checked'] = checked
    });
  }

  async deleteProducts(){
    
    const choice = await this.componentsUtilsService
      .presentAlert1('Info.', this.productsToDelete.length <= 1 ? '¿Desea eliminar el producto?' : '¿Desea eliminar los productos?');

    if (choice) {
      this.productError = await this.db.deleteProductsFromDetailList(this.productsToDelete); 
      this.products = this.products.filter((prod)=>{
        if(this.productsToDelete.includes(prod['id_detail_list'])){
          return this.productError.includes(prod['id_detail_list'])          
        }else{
          return true
        }
      });
      this.closeMultiDelete();
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

  productNotRemoved(id:number){
    var found =true;
    for (let index = 0; index < this.productError.length; index++) {
      if(this.productError[index] == id){
        found = false;
        break;
      } 
    }
    return found;
  }

}
