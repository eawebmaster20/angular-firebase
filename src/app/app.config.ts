import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideServiceWorker } from '@angular/service-worker';

const firebaseConfig = {
  apiKey: "AIzaSyBuuxrL3nOk_KWqBowDrmM-foWDuJmJbaM",
  authDomain: "analytics-crud.firebaseapp.com",
  databaseURL: "https://analytics-crud-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "analytics-crud",
  storageBucket: "analytics-crud.appspot.com",
  messagingSenderId: "918538008426",
  appId: "1:918538008426:web:5cc2edd073bfcc5defd713",
  measurementId: "G-Q0MK4ZMRM5"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBuuxrL3nOk_KWqBowDrmM-foWDuJmJbaM",
//   authDomain: "analytics-crud.firebaseapp.com",
//   projectId: "analytics-crud",
//   storageBucket: "analytics-crud.appspot.com",
//   messagingSenderId: "918538008426",
//   appId: "1:918538008426:web:5cc2edd073bfcc5defd713",
//   measurementId: "G-Q0MK4ZMRM5"
// }
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
    // importProvidersFrom([
    // ])
    ,
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
]
};
