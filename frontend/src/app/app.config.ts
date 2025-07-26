import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
<<<<<<< HEAD
import { authInterceptor } from './intercepter/auth.interceptor';
=======
import { authInterceptor } from './interceptors/auth.interceptor';
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxStripeModule } from 'ngx-stripe';
import { STRIPE_PK } from '../environments/environment';

export const appConfig: ApplicationConfig = {
<<<<<<< HEAD
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideAnimations(),
     provideHttpClient(withInterceptors([authInterceptor])),
     importProvidersFrom(
      NgxStripeModule.forRoot(STRIPE_PK)
    )
  ]
};
=======
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      NgxStripeModule.forRoot(STRIPE_PK)
    )
  ]
}
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
