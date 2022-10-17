import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { MoviePage } from '../movie/movie.page';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies:any;
  textoBuscar='';

  constructor(private movieService: MoviesService, private modal: ModalController) { }

  ngOnInit() {
    this.getMovies();
  }
  getMovies(){
    this.movieService.getMovies().then(res =>{
        this.movies = res; 
    })
   }
  buscar(event){
    this.movies = null;
    if(event.detail.value == ''){
      this.movies = null;
      this.getMovies();
    }
    else{
      this.movieService.getMovie(event.detail.value).then(res =>{
        this.movies = res; 
      })
    }

  }
  async addMovie(movie){
    const modal = await this.modal.create({
      component: MoviePage,
      componentProps : {
        'movie' : movie,
      }
    });
    await modal.present();
  }

}
