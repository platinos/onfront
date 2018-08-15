import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { AnimationService, AnimatesDirective } from 'css-animator';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreatepostPage } from '../pages/createpost/createpost';
import { RestProvider } from '../providers/rest/rest';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { IonicStorageModule } from '@ionic/storage';
import { UserData } from '../providers/user-data';
import { ProfileProvider } from '../providers/profileProvider';
import { HeaderMenuComponent } from '../components/header-menu/header-menu';
import { ImageuploaderProvider } from '../providers/imageuploader/imageuploader';
import { QRScanner } from '@ionic-native/qr-scanner';
import { CurrenciesProvider } from '../providers/currencies/currencies';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreatepostPage,
    HeaderMenuComponent,
    AnimatesDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreatepostPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    AuthenticationProvider,
    UserData,
    ProfileProvider,
    ImageuploaderProvider,
    Camera,
    AnimationService,
    QRScanner,
    CurrenciesProvider,
  ],
})
export class AppModule {}
