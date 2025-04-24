import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './intercepter/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxStripeModule } from 'ngx-stripe';
import { STRIPE_PK } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideAnimations(),
     provideHttpClient(withInterceptors([authInterceptor])),
     importProvidersFrom(
      NgxStripeModule.forRoot(STRIPE_PK)
    )
  ]
};
