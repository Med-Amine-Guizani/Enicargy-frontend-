import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient} from '@angular/common/http'; // <-- Ajoutez ceci
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),provideAnimations(),  provideHttpClient(),]

 
};



