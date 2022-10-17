import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MoviesPageRoutingModule } from './movies-routing.module';
import { MoviesPage } from './movies.page';
import { MoviePage } from '../movie/movie.page';
import { MoviePageModule } from '../movie/movie.module';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  entryComponents:[
    MoviePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviesPageRoutingModule,
    MoviePageModule,
    PipeModule,
  ],
  declarations: [MoviesPage]
})
export class MoviesPageModule {}
