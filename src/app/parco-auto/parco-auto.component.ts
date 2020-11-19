import { Component, OnInit } from '@angular/core';
import { TableConfig, TableHeader, TableOrder , TablePagination, TableSearch } from '../table/table.component';
import { Route, Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
@Component({
  selector: 'app-parco-auto',
  templateUrl: './parco-auto.component.html',
  styleUrls: ['./parco-auto.component.css']
})
export class ParcoAutoComponent implements OnInit {

  constructor(private route : Router) { }

  ngOnInit(): void {
    this.ButtonAggiungi = true;
    this.privilegi = sessionStorage.getItem("privilegi");
  }

  privilegi;
  tbOrder : TableOrder = {column : "id" , orderType : "ASC"}
  tbSearch : TableSearch = { column : "" , value : ""}
  tbPagination : TablePagination = {itemPerPage : 3, itemPerPageOption : [3,6,10]}
  
  
    tbHeader : TableHeader[] =  [
      { key : "id", label : "ID"},
      { key : "casa", label : "Casa Costruttrice"},
      { key : "modello", label : "Modello"},
      { key : "targa", label : "Targa"},
      { key : "immatricolazione", label : "Data Immatricolazione"}
      
    ]

    tbData : any[] = [
       {
        "id" : "1",
        "casa" : "Renault",
        "modello" : "Smart",
        "targa" : "XC YRSDX",
        "immatricolazione" : "01/01/2000"
      },
      {
        "id" : "2",
        "casa" : "Hyundai",
        "modello" : "Asosa",
        "targa" : "CA 4HDSA",
        "immatricolazione" : "01/01/2000"
      },
      {
        "id" : "3",
        "casa" : "Daniele",
        "modello" : "Rossino",
        "targa" : "10/09/2001",
        "immatricolazione" : "01/01/2000"
      },
      {
        "id" : "4",
        "casa" : "Daniele",
        "modello" : "Rossino",
        "targa" : "10/09/2001",
        "immatricolazione" : "01/01/2000"
      },
      {
        "id" : "5",
        "casa" : "Daniele",
        "modello" : "Rossino",
        "targa" : "10/09/2001",
        "immatricolazione" : "01/01/2000"
      },
      {
        "id" : "6",
        "casa" : "Daniele",
        "modello" : "Rossino",
        "targa" : "10/09/2001",
        "immatricolazione" : "01/01/2000"
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
