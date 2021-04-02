import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ComponentsUtilsService } from '../../services/components-utils.service';

@Component({
  selector: 'app-filter-options-lists',
  templateUrl: './filter-options-lists.page.html',
  styleUrls: ['./filter-options-lists.page.scss'],
})
export class FilterOptionsListsPage implements OnInit {

   @Input() filters={
    state:1,
    orderDateBy:'asc'
  };
  states=[
    {state:1,nameState:'Pendiente'},
    {state:2,nameState:'Pedido'},
    {state:3,nameState:'Recibido'},
    {state:4,nameState:'Todos'}
  ]
  constructor(private componentsUtilsService:ComponentsUtilsService) { }

  ngOnInit() {
  }

  ionViewWillLeave(){
    this.componentsUtilsService.presentPopoverFilterOptionsData.next(this.filters)
  }

}
