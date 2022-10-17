import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(private storageService: StorageService,
      private authenticationService: AuthenticationService,
      private router: Router ) {
        this.storageService.init();
        this.initializeApp();   
    }
    async initializeApp() {
      this.authenticationService.isAuthenticated.subscribe(state => {
        if (state) {
          this.router.navigate(['movies']);
        } else {
          this.router.navigate(['login']);
        }
      })
    }
}
