import { Component } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public language: string;
  public languages: string[];

  constructor(
    private sqlite: SqliteService
  ) {
    this.language = '';
    this.languages = [];
  }

  // Al entrar, leemos la base de datos
  ionViewWillEnter(){
    this.read();
  }

  create(){
    // Creamos un elemento en la base de datos
    this.sqlite.create(this.language.toUpperCase()).then( (changes) =>{
      console.log(changes);
      console.log("Creado");
      this.language = '';
      this.read(); // Volvemos a leer
    }).catch(err => {
      console.error(err);
      console.error("Error al crear");
    })
  }

  read(){
    // Leemos los datos de la base de datos
    this.sqlite.read().then( (languages: string[]) => {
      this.languages = languages;
      console.log("Leido");
      console.log(this.languages);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }
  
  update(language: string){
    // Actualizamos el elemento (language) por el nuevo elemento (this.language)
    this.sqlite.update(this.language.toUpperCase(), language).then( (changes) => {
      console.log(changes);
      console.log("Actualizado");
      this.language = '';
      this.read(); // Volvemos a leer
    }).catch(err => {
      console.error(err);
      console.error("Error al actualizar");
    })
  }

  delete(language: string){
    // Borramos el elemento
    this.sqlite.delete(language).then( (changes) => {
      console.log(changes);
      console.log("Borrado");
      this.read(); // Volvemos a leer
    }).catch(err => {
      console.error(err);
      console.error("Error al borrar");
    })
  }

}
