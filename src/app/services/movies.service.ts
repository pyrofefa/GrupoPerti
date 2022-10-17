import { Injectable } from '@angular/core';
import { APIMovies } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private results = [];

  constructor(public http: HttpClient) { }

  async getMovies(){
    const params = {};
    return new Promise(resolve => {
      this.http.get(APIMovies + 'schedule/full', params).toPromise().then(data =>{
        let result:any = data;
        for (let r of result) {
          let res = {
            'name' : r.name,
            'show' : r._embedded.show.name,
            'date' : r.airdate,
            'image' : r._embedded.show.image,
            'summary' : r._embedded.show.summary
          }
          this.results.push(res);
        }
        resolve(this.results);            
      }).catch(error =>{
        resolve(error);
      })
    });
  }

  async getMovie(name:string){
    const params = {};
    return new Promise(resolve => {
      this.http.get(APIMovies + 'search/shows?q='+name, params).toPromise().then(data =>{
        let result:any = data;
        for (let r of result) {
          let res = {
            'name' : r.show.name,
            'show' : r.show.name,
            'date' : r.show.premiered,
            'image' : r.show.image,
            'summary' : r.show.summary
          }
          this.results.push(res);
        }
        resolve(this.results);
      }).catch(error =>{
        resolve(error);
      })
    });
  }
}
