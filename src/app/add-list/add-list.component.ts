import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database-service';
import { ComponentsUtilsService } from '../../services/components-utils.service';
@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss'],
})
export class AddListComponent implements OnInit {

  dateCreationList:string;
  products:Array<any> = [];

  nameList:string="";
  constructor(private databaseService:DatabaseService,private componentsUtilsService:ComponentsUtilsService) { 
    const date:Date = new Date();
    const day = date.getDate(),
    month = date.getMonth()+1,
    year = date.getFullYear();
  
    this.dateCreationList = month<10?`${day}/0${month}/${year}`:`${day}/${month}/${year}`;
  }

  ngOnInit() {
  }

  async searchProduct(){
    var products:Array<any> = await this.componentsUtilsService.presentModalSearchProduct(this.products);
    products.forEach((prod)=>{
      this.products.push(prod)
    })
  }

  async viewProducts(){
    try{
      await this.componentsUtilsService.presentModalViewProducts(this.products,false);
      this.reset();
    }catch(e){

    }
  }

  saveList(){
    if(this.nameList.length>0 && this.products.length>0){
      this.databaseService.addList(this.nameList,new Date().toString(),this.products)
    }
    else{
      this.componentsUtilsService.presentToast1('Cumpla con todos los requisitos.')
    }
  }

  reset(){
    this.nameList= '';
    this.products =[];
  }
}