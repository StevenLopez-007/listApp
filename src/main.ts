import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {defineCustomElements} from '@teamhive/lottie-player/loader';
if (environment.production) {
  enableProdMode();
}

defineCustomElements(window).then(()=>{}).catch(err=>{
  console.log('Error al configurar las animaciones.'+err)
})
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
