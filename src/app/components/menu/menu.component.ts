import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit,OnDestroy {

  constructor(public alertController: AlertController, private login: AuthenticationService) { }

  ngOnInit() {}
  ngOnDestroy(){
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cerrar sesión ',
      message: '¿Estás seguro que quieres cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cerrar sesion');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.login.logout();
          }
        }
      ]
    });

    await alert.present();
  }
}
