import { AnimationController } from '@ionic/angular';

export const enterAnimationAlert = (baseEl)=>{
    const animationCtrl = new AnimationController()
    const backDropAnimation = animationCtrl.create()
    .addElement(baseEl.querySelector('ion-backdrop')!)
    .fromTo('opacity','0.01','var(--backdrop-opacity)');

    const wrapperAnimation = animationCtrl.create()
    .addElement(baseEl.querySelector('.alert-wrapper')!)
    .keyframes([
        { offset: 0,opacity:'1',transform: 'scale(0)' },
        { offset: 0.25, opacity:'1',transform: 'scale(1)' },
        { offset: 0.50, opacity:'1',transform: 'scale(1.1)' },
        { offset: 1, opacity:'1',transform: 'scale(1)' },
    ])

    return animationCtrl.create()
    .addElement(baseEl)
    .easing('linear')
    .duration(350)
    .addAnimation([backDropAnimation,wrapperAnimation])
}

export const leaveAnimationAlert =(baseEl:any)=>{
    const animationCtrl = new AnimationController();
    return animationCtrl.create()
    .addElement(baseEl.querySelector('.alert-wrapper')!)
    .duration(200)
    .fromTo('transform','scale(1)','scale(0)')
    .addAnimation(
        animationCtrl.create()
        .addElement(baseEl.querySelector('ion-backdrop')!)
        .duration(200)
        .fromTo('opacity','0.32','0.01')
      )
}
