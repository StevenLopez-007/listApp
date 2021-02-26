import {AnimationController,Animation} from '@ionic/angular';

export const enterAnimation = (baseEl:HTMLElement,opts?:any):Animation=>{
    const DURARION = 250;
    console.log('entro')
    console.log('baseEl: ',baseEl);
    console.log('opts ',opts);

    // const animationCtrl = new AnimationController();

    // if(opts.direction === 'forward'){
    //     return animationCtrl.create()
    //     .addElement(baseEl)
    //     .duration(DURARION)
    // }
    return null
}