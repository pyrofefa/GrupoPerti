import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  showPassword = false;
  passwordToggleIcon = 'eye';

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private route: Router,
    private localNotifications: LocalNotifications,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['', [Validators.required ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.authService.login(this.credentials.value).then(async res =>{
      await loading.dismiss();        
      this.route.navigate(['movies']);
      this.getNotification();
    }).catch(async error =>{
      console.log(error)
      await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error de inicio de sesión',
          message: 'Nombre de usuario o contraseña invalido',
          buttons: ['OK'],
        });
         await alert.present();
    })
  }

  // Easy access for form fields
  get username() {
    return this.credentials.get('username');
  }
  
  get password() {
    return this.credentials.get('password');
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
  register(){
    this.route.navigate(['register']);
  }

  getNotification(){
    this.localNotifications.schedule({
      id: 1,
      title: 'Inicio de sesión ',
      text: 'Has iniciado sesión',
    });
  }

}
