import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

 private apiKey: string = 'oIPJj7lq0QEeAz6u7ShuabhzXbG7oMCn'
 private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
 private _historial: string [] = [];


//TODO: cambiar any por su tipo correspondiente
 public resultados: Gif[] = [];

 get historial(){

   return [...this._historial];
 }
constructor(private http: HttpClient){

  this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  // if ( localStorage.getItem('historial') ) {
  //   this._historial = JSON.parse(localStorage.getItem('historial')!);
  // }

}

// async buscarGifs(query: string){
    buscarGifs(query: string){

  query = query.trim().toLowerCase();

  if( !this._historial.includes(query)){
    this._historial.unshift(query);
    this._historial = this._historial.splice(0,10);

  localStorage.setItem('historial', JSON.stringify(this._historial));

  }

// /*Resultado utilizando la etiqueta async await*/
//   const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=oIPJj7lq0QEeAz6u7ShuabhzXbG7oMCn&q=dragon ball z&limit=10');
//   const data = await resp.json();
//   console.log(data);


  const params = new HttpParams().set('api_key', this.apiKey)
                                 .set('limit', '10')
                                 .set('q', query)


  console.log(params.toString( ));



  this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, {params} )
    .subscribe( (resp: SearchGifsResponse) =>
      {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })

    }

}

