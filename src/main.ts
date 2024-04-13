import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app/app.component';
import { initializeApp } from './app/app.initializer';
import routes from './app/app.routes';
import { LanguageConstants } from './app/constants/languages';
import { environment } from './environments/environment';
import { MockInterceptorRegistry } from './mocks/mock-interceptor-registry/mock-interceptor-registry.constants';

export const httpLoaderFactory = (http: HttpClient): TranslateLoader =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([...MockInterceptorRegistry.getMockInterceptors()])),
    importProvidersFrom(
      IonicStorageModule.forRoot(),
      TranslateModule.forRoot({
        defaultLanguage: LanguageConstants.defaultLanguageCode,
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [TranslateService],
    },
  ],
});

if (environment.production) {
  enableProdMode();
}
