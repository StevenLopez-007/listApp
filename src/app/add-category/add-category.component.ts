import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { DatabaseService } from '../../services/database-service';
import { ComponentsUtilsService } from '../../services/components-utils.service';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  providers:[DatabaseService]
})
export class AddCategoryComponent implements OnInit {
  categoryForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private databaseService:DatabaseService,
              private componentsUtilsService:ComponentsUtilsService) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      nameCat:['',[Validators.required]]
    });
  }

  async saveCat(){
    if(this.categoryForm.valid){
      await this.databaseService.addCategory(this.categoryForm.value.nameCat)
    }
    else{
      await this.componentsUtilsService.presentToast1('Cumple con los requerimientos.')
    }
  }

}
