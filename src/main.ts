import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import PubSub from '@aws-amplify/pubsub';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';

if (environment.production) {
  enableProdMode();
}
Amplify.configure(awsconfig);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
