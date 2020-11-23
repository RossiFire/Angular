import { Component, OnInit, AfterViewInit, ɵConsole, AfterContentChecked} from '@angular/core';
import { TableConfig, TableHeader, TableOrder, TableSearch, TablePagination} from '../table/table.component';
import { ButtonConfig } from '../button/button.component';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import { UtentiDataService } from '../services/data/utenti-data.service';
import { NativeDateModule } from '@angular/material/core';
import { async } from 'q';
@Component({
  selector: 'app-vista-utenti',
  templateUrl: './vista-utenti.component.html',
  styleUrls: ['./vista-utenti.component.css']
})
export class VistaUtentiComponent implements OnInit{
  constructor(private route : Router, private UtentiDataService : UtentiDataService) {
    this.buttonAggiungi = true;
    this.privilegi = sessionStorage.getItem("privilegi");
    this.UserAttuale = sessionStorage.getItem("UsernameAttuale");
    this.UtentiDataService.getUtenti().subscribe(
      response =>{
        this.tbData = response; 
      });
  }

  ngOnInit(): void {

    let mom;
    for(let i = 0; i<this.tbData.length; i++){
      for(let j=0; j<this.tbHeader.length;j++){
        if(this.tbHeader[j].key === 'tipoutente'){
          mom = _.get(this.tbData[i], this.tbHeader[j].key);
          console.log(mom);
          this.tbData[i][this.tbHeader[j].key] = mom;
        }
      }
    }
  }







  privilegi;
  UserAttuale;
  tbOrder : TableOrder = {column : "id" , orderType : "ASC"}
  tbSearch : TableSearch = { column : "" , value : ""}
  tbPagination : TablePagination = {itemPerPage : 3, itemPerPageOption : [3,6,10]}
  
  
    tbHeader : any[] =  [
      { key : "id", label : "ID"},
      { key : "nome", label : "Nome"},
      { key : "cognome", label : "Cognome"},
      { key : "nascita", label : "Anno di Nascita"},
      { key : "tipoutente", label : "Tipo Utente"},
      { key : "password", label : "Password"}
    ]

    tbData : any[] = [];

  
  
  tbConfig : TableConfig = {
    header : this.tbHeader, order : this.tbOrder,
    search : this.tbSearch, pagination : this.tbPagination
  }
  

  btnConfig : ButtonConfig = {
    text : 'Bottone', icon : '<i class="fas fa-rocket"></i>', 
    customCss : {'background-color' : "red", 'color' : "yellow"}
  }

  temp : any[];
  datoModifica : any[] = new Array();
  buttonAggiungi : boolean = true;
  cercaValori : any[];
  idInMemoria;
  CrudOperation(values){
    switch(values['op']){
      case 'ELIMINA':
          this.tbData = _.reject(this.tbData, [values['col'], values['id']]);
          break;
      case 'AGGIUNGI':
          this.Aggiungi(values);
          break;
      case 'PRECOMPILA':
          this.buttonAggiungi = false;
          this.datoModifica = new Array();
          this.temp = _.find(this.tbData, [values['col'], values['id']]);
          for(let i = 0; i<this.tbHeader.length; i++){
            this.datoModifica.push(this.temp[this.tbHeader[i].key]);
          }
          for(let i = 0; i<this.tbData.length; i++){
            if(this.temp[this.tbHeader[0].key] === this.tbData[i][this.tbHeader[0].key]){
              this.idInMemoria =  this.temp[this.tbHeader[0].key]
              }
          }
          break;
      case 'MODIFICA':
          this.temp = _.find(this.tbData, [values['col'], values['id']]);
          for(let i = 0; i<this.tbData.length; i++){
            if(this.idInMemoria === this.tbData[i][this.tbHeader[0].key]){
                for(let h=0; h<this.tbHeader.length; h++){
                  this.tbData[i][this.tbHeader[h].key] = this.datoModifica[h];
                }
              }
          }
          this.buttonAggiungi = true;
          this.datoModifica = new Array();
          break;
      default :
      console.log("errore DEFAULT");
      break;
    }
  };
  

  Aggiungi(values){
    let newDato : any[] = [];
    for(let i = 0; i<this.tbHeader.length ; i++){
      newDato.push({[this.tbHeader[i].key] : values['id'][i]});
    }
    var result = {};
    for (var i = 0; i < newDato.length; i++) {
      result[this.tbHeader[i].key] = newDato[i][this.tbHeader[i].key];
    }
    this.tbData.push(result);
  } 




  getSaluti(){
    this.UtentiDataService.getUtenti().subscribe(
      response => this.handlerResponse(response),
      error => this.handlerError(error)
    );
  }

  handlerResponse(response){
    this.messaggio = response;
  }

  handlerError(error){
    this.messaggio = error.error.message;
  }

  messaggio;


}
