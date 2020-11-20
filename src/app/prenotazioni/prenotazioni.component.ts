import { Component, OnInit } from '@angular/core';
import { TableConfig, TableHeader, TableOrder, TableSearch, TablePagination} from '../table/table.component';
import { ButtonConfig } from '../button/button.component';
import { Router } from '@angular/router';
import * as _ from 'lodash'; 

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.ButtonAggiungi = true;
    this.Privilegi = sessionStorage.getItem("privilegi");
  }

  Privilegi;

  tbOrder : TableOrder = {column : "id" , orderType : "ASC"}
  tbSearch : TableSearch = { column : "" , value : ""}
  tbPagination : TablePagination = {itemPerPage : 3, itemPerPageOption : [3,6,10]}
  
  
    tbHeader : TableHeader[] =  [
      { key : "id", label : "ID"},
      { key : "utente", label : "Utente"},
      { key : "mezzo", label : "Mezzo"},
      { key : "inizio", label : "Data inizio"},
      { key : "fine", label : "Data fine"},
      { key : "approvata", label : "Approvata"}
    ]

    tbData : any[] = [
      {
        "id" : "1",
        "utente" : "Renault",
        "mezzo" : "Smart",
        "inizio" : "10/09/2021",
        "fine" : "01/01/2000",
        "approvata" : "No"
      },
      {
        "id" : "2",
        "utente" : "Gigio",
        "mezzo" : "Camaro",
        "inizio" : "10",
        "fine" : "01/01/2000",
        "approvata" : "Si"
      },
      {
        "id" : "3",
        "utente" : "Peppe",
        "mezzo" : "500",
        "inizio" : "12/10/2000",
        "fine" : "01/01/2001",
        "approvata" : "No"
      },
      {
        "id" : "4",
        "utente" : "Marta",
        "mezzo" : "SF1000",
        "inizio" : "08/04/2000",
        "fine" : "01/01/2020",
        "approvata" : "No"
      },
    ]

  
  
  tbConfig : TableConfig = {
    header : this.tbHeader, order : this.tbOrder,
    search : this.tbSearch, pagination : this.tbPagination
  }





  Temp : any[];
  DatoModifica : any[] = new Array();
  ButtonAggiungi : boolean = true;
  CercaValori : any[];
  IdInMemoria;
  CrudOperation(values){
    console.log("AOO");
    console.log(values);
    switch(values['op']){
      case 'ELIMINA':
          this.tbData = _.reject(this.tbData, [values['col'], values['id']]);
          break;
      case 'AGGIUNGI':
          this.Aggiungi(values);
          break;
      case 'PRECOMPILA':
          this.ButtonAggiungi = false;
          this.DatoModifica = new Array();
          this.Temp = _.find(this.tbData, [values['col'], values['id']]);
          for(let i = 0; i<this.tbHeader.length; i++){
            this.DatoModifica.push(this.Temp[this.tbHeader[i].key]);
          }
          for(let i = 0; i<this.tbData.length; i++){
            if(this.Temp[this.tbHeader[0].key] === this.tbData[i][this.tbHeader[0].key]){
              this.IdInMemoria =  this.Temp[this.tbHeader[0].key]
              }
          }
          break;
      case 'MODIFICA':
          this.Temp = _.find(this.tbData, [values['col'], values['id']]);
          for(let i = 0; i<this.tbData.length; i++){
            if(this.IdInMemoria === this.tbData[i][this.tbHeader[0].key]){
                for(let h=0; h<this.tbHeader.length; h++){
                  this.tbData[i][this.tbHeader[h].key] = this.DatoModifica[h];
                }
              }
          }
          this.ButtonAggiungi = true;
          this.DatoModifica = new Array();
          break;
      default :
      console.log("errore DEFAULT");
      break;
    }
  };
  

  Aggiungi(values){
    let NewDato : any[] = [];
    for(let i = 0; i<this.tbHeader.length ; i++){
      NewDato.push({[this.tbHeader[i].key] : values['id'][i]});
    }
    var result = {};
    for (var i = 0; i < NewDato.length; i++) {
      result[this.tbHeader[i].key] = NewDato[i][this.tbHeader[i].key];
    }
    this.tbData.push(result);
  } 




}
