import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-cat',
  templateUrl: './select-cat.page.html',
  styleUrls: ['./select-cat.page.scss'],
})
export class SelectCatPage implements OnInit {
  @Input() categories:Array<any>;
  @Input() category:Object={};
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    // console.log(this.category)
  }

  async closeSelectCat(){
    await this.modalController.dismiss({
      category:this.category
    })
  }
}
