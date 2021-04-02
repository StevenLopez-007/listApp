import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { DatabaseService } from '../../services/database-service';
import { ComponentsUtilsService } from '../../services/components-utils.service';
import { ButtonSaveClickService } from '../../services/button-save-click.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  providers:[DatabaseService]
})
export class AddCategoryComponent implements OnInit {
  categoryForm:FormGroup;
  @Output() saveCategory:EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder:FormBuilder,private databaseService:DatabaseService,
              private componentsUtilsService:ComponentsUtilsService,private saveClick:ButtonSaveClickService) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      nameCat:['',[Validators.required]]
    });

    this.saveClick.click$.subscribe((res)=>{
      if(res){
        if(res['tab']==0){
          this.saveCat();
        }
      }
    })
  }

  async saveCat(){
    if(this.categoryForm.valid){
      const catSaved = await this.databaseService.addCategory(this.categoryForm.value.nameCat);
      if(catSaved){
        this.categoryForm.reset();
        this.saveCategory.emit(catSaved)
      }
      
    }
    else{
      await this.componentsUtilsService.presentToast1('Cumple con los requerimientos.')
    }
  }
}
