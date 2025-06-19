import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHighcharts } from 'highcharts-angular';

bootstrapApplication(App, {
  providers: [
    provideHighcharts({
      load: () => import('highcharts'),
    } as any),
  ],
});
