import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Gesture, GestureController, AnimationController, Animation } from '@ionic/angular'
import { HostListener } from '@angular/core';
import {DatabaseService} from '../../services/database-service'
import { ComponentsUtilsService } from '../../services/components-utils.service';
import {SwipeList} from '../../animations/swipeListAnimation'
import { DetailList } from '../../model/detailList';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers:[SwipeList]
})
export class Tab1Page implements OnInit {
  contador: number = 0;
  colors = [
    {
      'background': 'linear-gradient(45deg, rgba(255,48,90,1) 10%, rgba(255,85,137,1) 100%)'
    },
    {
      'background': 'linear-gradient(17deg, rgba(3,126,255,1) 10%, rgba(11,172,253,1) 100%)'
    },
    {
      'background': 'linear-gradient(17deg, rgba(253,168,36,1) 10%, rgba(254,198,61,1) 100%)'
    }
  ];
  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    // effect: slide,
    spaceBetween: 8,
    slidesPerView: 2.5,
    freeMode: true,
    loop: false
  };

  listDetails:Array<DetailList[]>=[];
  @ViewChild('barSwipe', { read: ElementRef }) barSwipe: ElementRef;
  constructor(private gestureCtrl: GestureController, private animationCtrl: AnimationController,
              private dbService:DatabaseService,private componentsUtilsService:ComponentsUtilsService,
              private swipeList:SwipeList) { }

  ngOnInit() {
    this.dbService.dbState().subscribe(async (res)=>{
      if(res){
        await this.getDetailList();
      }
      else{
        this.componentsUtilsService.presentToast1('No se ha podido conectar a la base de datos.')
      }
    })
  }

  ionViewDidEnter() {
    this.swipeList.swipeAnimation(this.barSwipe);
    this.componentsUtilsService.setTabStatusBar('tab1');
  }

  colorCard() {
    if (this.contador > 2) {
      this.contador = 0;
    }
    switch (this.contador) {
      case 0: {
        this.contador += 1
        return this.colors[0]
      }
      case 1: {
        this.contador += 1
        return this.colors[1]
      }
      case 2: {
        this.contador += 1
        return this.colors[2]
      }
      default: {
        break;
      }
    }
  }

  async getDetailList(){
    await this.dbService.loadLists();
    this.dbService.getLists().subscribe(res=>{
      this.listDetails = res;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(ev) {
    this.swipeList.configSteps()
  }
}
