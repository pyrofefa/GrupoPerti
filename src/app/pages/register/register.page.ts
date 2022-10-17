import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage-angular';
import { AssetsService } from 'src/app/services/assets.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  captura:any;
  showPassword = false;
  passwordToggleIcon = 'eye';

  constructor(private route: Router, private storage: Storage, private extras: AssetsService, 
    private localNotifications: LocalNotifications
  ) { }

  ngOnInit() {
    this.captura = {
      nombre : '', 
      apellido_paterno : '',
      apellido_materno : '',
      direccion : '',
      cp : '',
      ciudad : '',
      estado : '',
      username : '',
      password : '',
      correo : ''
    }
  }
  atras(){
    this.route.navigate(['login']);
  }
  save(){
    this.extras.cargandoMessage('Guardando');
    this.storage.set('users',JSON.stringify(this.captura)).then(()=>{
      setTimeout(()=>{
        this.extras.loading.dismiss();
        this.route.navigate(['login']);
        this.extras.presentToast('Usuario registrado con exito.');
        this.getNotification();
      },1500);

    }).catch(error =>{
      this.extras.presentToast('Ocurrió un error intente de nuevo.');
    })
  }
  togglePassword():void {
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye'){
        this.passwordToggleIcon = 'eye-off';
    }
    else{
      this.passwordToggleIcon = 'eye';
    }
  }
  getNotification(){
    this.localNotifications.schedule({
      id: 1,
      title: 'Usuario Registrado',
      text: 'Nuevo usuario',
    });
  }
}
