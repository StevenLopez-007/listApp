import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSelect, ModalController } from '@ionic/angular';
import { EnterAnimation1 } from '../../animations/enterAnimation';
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.page.html',
  styleUrls: ['./view-products.page.scss'],
  providers: [EnterAnimation1]
})
export class ViewProductsPage implements OnInit {

  search: string = '';
  @Input() products: Array<any>;
  @Input() filterByCat: boolean;
  cats: Array<any> = [];
  searchBy: string = '';
  @ViewChild('selectFilter') selectionFilter: IonSelect;
  optionsSelectAlert = {
    header: 'Filtrar por la categoria...',
    enterAnimation: this.enterAnimation1.enterAnimation,
    leaveAnimation: this.enterAnimation1.leaveAnimation
  }
  constructor(private modalController: ModalController,
    private enterAnimation1: EnterAnimation1) { 
    }

  ngOnInit() {
    this.selectCats();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  deleteProduct(i: any) {
    const heigth = document.getElementById(`item${i}`).offsetHeight;
    document.getElementById(`item${i}`).animate([
      { height: `${heigth}px`, transform: 'translateX(0%)' },
      { height: '0px', transform: 'translateX(100%)' }
    ], { duration: 250 })
    setTimeout(() => { this.products.splice(i, 1); }, 250)
  }

  selectCats() {

    if (this.filterByCat) {
      const products = this.products;

      var cats = [];

      products.forEach((product, index) => {
        if (!cats.includes(product['nameCat'])) {
          cats.push(product['nameCat']);
        }

        if (index == products.length - 1) {
          this.cats = cats;
        }
      });
    }
    else{
      this.cats = ['not']
    }
  }

  async openFilters() {
    await this.selectionFilter.open()
  }

  get showOptionsFilter(){
    return !this.cats.includes('not')
  }

}
