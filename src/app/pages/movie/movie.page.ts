import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  @Input() movie: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    
  }
  closeModal(){
    this.modalCtrl.dismiss()
  }
  strip(html: string) {
    if(html != null){
      return html.replace(/<(?:.|\n)*?>/gm, '');
    }
  }
  
  br2nl(html: string) {
    if(html != null){
      return html.replace(/<br( \/|\/|)>/gm, '\r\n');
    }
  }
}
