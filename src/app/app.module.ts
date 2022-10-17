import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PipeModule } from './pipes/pipe.module';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [ AppComponent, MenuComponent ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule, 
    HttpClientModule,
    PipeModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    Storage, LocalNotifications
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
