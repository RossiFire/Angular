import { Component, OnInit, ɵConsole, OnDestroy, OnChanges, SimpleChanges, AfterContentInit} from '@angular/core';
import { TableConfig, TableHeader, TableOrder, TableSearch, TablePagination} from '../table/table.component';
import { ButtonConfig } from '../button/button.component';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import { UtentiDataService } from '../services/data/utenti-data.service';
import { Observable, observable } from 'rxjs';
import { UtenteModel } from '../UtenteModel';
@Component({
  selector: 'app-vista-utenti',
  templateUrl: './vista-utenti.component.html',
  styleUrls: ['./vista-utenti.component.css']
})
export class VistaUtentiComponent implements OnInit{
  constructor(private route : Router, private UtentiDataService : UtentiDataService) {}

  temp : any[];
  datoModifica : any[] = new Array();
  buttonAggiungi : boolean = true;
  cercaValori : any[];
  idInMemoria;
  UtenteModel : UtenteModel = {id: 0, nome: "", cognome: "", tipoutente: {id: 1 , tipo : ""}, nascita : new Date(), password: ""};
  obs : Observable<any[]>;
  privilegi;
  UserAttuale;
  tbOrder : TableOrder = {column : "id" , orderType : "ASC"}
  tbSearch : TableSearch = { column : "" , value : ""}
  newDato : any[] = [];
    tbHeader : any[] =  [
      { key : "id", label : "ID"},
      { key : "nome", label : "Nome"},
      { key : "cognome", label : "Cognome"},
      { key : "nascita", label : "Anno di Nascita"},
      { key : "tipoutente", label : "Tipo Utente"},
      { key : "password", label : "Password"}
    ]
    tbData : any[] = [];
    tbPagination : TablePagination = {itemPerPage : 3, itemPerPageOption : [3,6,10]};
    tbConfig : TableConfig = {
      header : this.tbHeader, order : this.tbOrder,
      search : this.tbSearch, pagination : this.tbPagination
    }
  btnConfig : ButtonConfig = {
    text : 'Bottone', icon : '<i class="fas fa-rocket"></i>', 
    customCss : {'background-color' : "red", 'color' : "yellow"}
  }

  
  ngOnInit(): void {
    this.buttonAggiungi = true;
    this.privilegi = sessionStorage.getItem("privilegi");
    this.UserAttuale = sessionStorage.getItem("UsernameAttuale");

    this.obs = this.UtentiDataService.getUtenti();
    this.obs.subscribe(x => {
      for(let i = 0; i<x.length; i++){
        for(let j=0; j<this.tbHeader.length;j++){
          if(this.tbHeader[j].key === 'tipoutente'){
            x[i][this.tbHeader[j].key] = x[i][this.tbHeader[j].key]['tipo'];
          }
        }
      }
      this.tbData = x;
    });
  }






  SottoScrivi(){
    this.obs = this.UtentiDataService.getUtenti();
    this.obs.subscribe(x => {
      for(let i = 0; i<x.length; i++){
        for(let j=0; j<this.tbHeader.length;j++){
          if(this.tbHeader[j].key === 'tipoutente'){
            x[i][this.tbHeader[j].key] = x[i][this.tbHeader[j].key]['tipo'];
          }
        }
      }
      this.tbData = x;
    });
  }








  CrudOperation(values){
    switch(values['op']){
      case 'ELIMINA':
          this.Elimina(values['id']);
          break;
      case 'AGGIUNGI':
          this.Aggiungi(values);
          this.UtentiDataService.AddUtente(this.UtenteModel).subscribe(
            response => {
              alert("Utente aggiunto con successo!")
            },
            error =>{
              alert("Oops! Qualcosa è andato storto");
            }
            )
          this.SottoScrivi();
          this.UtenteModel = {id: 0, nome: "", cognome: "", tipoutente: {id: 1 , tipo : ""}, nascita : new Date(), password: ""};
          this.newDato = [];
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
          this.UtentiDataService.InviaIdUtente(values['id']).subscribe();
          break;
      case 'MODIFICA':
          this.Aggiungi(values);
          this.UtentiDataService.AggiornaUtente(this.UtenteModel).subscribe(
            response =>{
              alert("Utente modificato con successo!");
            },
            error =>{
              alert("Oops! L'utente non è stato modificato");
            }
          );
          this.SottoScrivi(); 
          this.UtenteModel = {id: 0, nome: "", cognome: "", tipoutente: {id: 1 , tipo : ""}, nascita : new Date(), password: ""};
          this.newDato = [];
          this.buttonAggiungi = true;
          this.datoModifica = new Array();
          break;
      default :
      console.log("errore DEFAULT");
      break;
    }
  };
  


  Aggiungi(values){
    for(let i = 0; i<this.tbHeader.length ; i++){
      this.newDato.push({[this.tbHeader[i].key] : values['id'][i]});
    }
    for (var i = 0; i < this.newDato.length; i++) {
      if(this.tbHeader[i].key === 'tipoutente'){
        this.UtenteModel[this.tbHeader[i].key]['tipo'] = this.newDato[i][this.tbHeader[i].key];
      }else{
        if(this.tbHeader[i].key === 'nascita'){
          this.UtenteModel[this.tbHeader[i].key] = Date.parse(this.newDato[i][this.tbHeader[i].key]);
        }else{
          this.UtenteModel[this.tbHeader[i].key] = this.newDato[i][this.tbHeader[i].key];
        }
      }
    }
  } 


    Elimina(id){
      this.UtentiDataService.EliminaUtente(id).subscribe(
        response => {
          alert("Utente eliminato con successo!");
        },
        error =>{
          alert("Oops! L'utente non è stato eliminato");
        }
      )
    }


}
