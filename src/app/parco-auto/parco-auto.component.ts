import { Component, OnInit } from '@angular/core';
import { TableConfig, TableHeader, TableOrder , TablePagination, TableSearch } from '../table/table.component';
import { Route, Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MezziDataService } from '../services/data/mezzi-data.service';
import { MezzoModel } from 'src/MezzoModel';
import * as moment from 'node_modules/moment';

@Component({
  selector: 'app-parco-auto',
  templateUrl: './parco-auto.component.html',
  styleUrls: ['./parco-auto.component.css']
})
export class ParcoAutoComponent implements OnInit {

  constructor(private route : Router, private MezziDataService : MezziDataService) { }

  /*------------------ Dati di sessione -------------------*/ 
  /*------------------------------------------------------ */
  UserAttuale;
  privilegi;


  /*------------------ Precompila form --------------------*/ 
  /*------------------------------------------------------ */
  MezzoModel : MezzoModel = {id: 1, casaCostr: "", modello: "", tipomezzo: {id: 1 , tipo : ""}, targa : ""};
  newDato : any[] = [];
  Temp : any[];
  DatoModifica : any[] = new Array();
  ButtonAggiungi : boolean = true;


  /*------------------ Table config -----------------------*/ 
  /*------------------------------------------------------ */
  tbOrder : TableOrder = {column : "id" , orderType : "ASC"}
  tbSearch : TableSearch = { column : "" , value : ""}
  tbPagination : TablePagination = {itemPerPage : 3, itemPerPageOption : [3,6,10]}
    tbHeader : TableHeader[] =  [
      { key : "id", label : "ID"},
      { key : "casaCostr", label : "Casa Costruttrice"},
      { key : "modello", label : "Modello"},
      { key : "tipomezzo", label : "Tipo Mezzo"},
      { key : "targa", label : "Targa"}
    ]
    tbData : any[];
    tbConfig : TableConfig = {
    header : this.tbHeader, order : this.tbOrder,
    search : this.tbSearch, pagination : this.tbPagination
  }


  /*------------------ Altre variabili --------------------*/ 
  /*------------------------------------------------------ */
  Data;




  /*--------------------- LifeCycles ----------------------*/ 
  /*------------------------------------------------------ */
  ngOnInit(): void {
    this.tbData = [];
    this.GetMezzi();
    this.ButtonAggiungi = true;
    this.privilegi = sessionStorage.getItem("privilegi");
    this.UserAttuale = sessionStorage.getItem("UsernameAttuale");
  }



  /*------------------- API Get mezzi ---------------------*/ 
  /*------------------------------------------------------ */
  GetMezzi() {
    this.MezziDataService.GetMezzi().subscribe(
      x => {
        for (let i = 0; i < x.length; i++) {
          for (let j = 0; j < this.tbHeader.length; j++) {
            if (this.tbHeader[j].key === 'tipomezzo') {
              x[i][this.tbHeader[j].key] = x[i][this.tbHeader[j].key]['tipo'];
            }
          }
        }
        this.tbData = x;
      });
  }




  /*------------- Set utente nella variabile --------------*/ 
  /*------------------------------------------------------ */
  Aggiungi(values) {
    for (let i = 0; i < this.tbHeader.length; i++) {
      this.newDato.push({ [this.tbHeader[i].key]: values['id'][i] });
    }
    for (var i = 0; i < this.newDato.length; i++) {
      if (this.tbHeader[i].key === 'tipomezzo') {
        switch (this.newDato[i][this.tbHeader[i].key]) {
          case 'AUTOVEICOLO':
            this.MezzoModel[this.tbHeader[i].key]['id'] = 2;
            break;
          case 'FURGONE':
            this.MezzoModel[this.tbHeader[i].key]['id'] = 3;
            break;
          case 'SUV':
            this.MezzoModel[this.tbHeader[i].key]['id'] = 4;
            break;
          case 'MINIVAN':
            break;
          default:
            alert("Per favore inserire uno tra i seguenti: 'MINIVAN','AUTOVEICOLO','FURGONE','SUV'");
            this.Ripulisci();
            break;
        }
        this.MezzoModel[this.tbHeader[i].key]['tipo'] = this.newDato[i][this.tbHeader[i].key];
      } else {
        this.MezzoModel[this.tbHeader[i].key] = this.newDato[i][this.tbHeader[i].key];
      }
    }
  } 


  /*--------------- Svuotare le variabili -----------------*/ 
  /*------------------------------------------------------ */
  Ripulisci(){
    this.MezzoModel = {id: 1, casaCostr: "", modello: "", tipomezzo: {id: 1 , tipo : ""}, targa : ""};
    this.newDato = [];
  }



  /*------------------ Operazioni CRUD --------------------*/ 
  /*------------------------------------------------------ */
  CrudOperation(values) {
    switch (values['op']) {
      case 'ELIMINA':
        this.MezziDataService.EliminaMezzo(values['id']).subscribe(
          response => {
            console.log("Successo");
            console.log(response);
            this.GetMezzi();
          },
          error => {
            console.log(error.error.text);
          }
        );
        break;
      case 'AGGIUNGI':
        this.Aggiungi(values);
        if (this.MezzoModel.casaCostr != "") {
          this.MezziDataService.AggiungiMezzo(this.MezzoModel).subscribe(
            response => {
              console.log(response);
              this.GetMezzi();
            },
            error => {
              console.log(error.error.text);
            }
          );
        }
        this.Ripulisci();
        break;
      case 'PRECOMPILA':
        this.ButtonAggiungi = false;
        this.DatoModifica = new Array();
        this.Temp = _.find(this.tbData, [values['col'], values['id']]);
        for (let i = 0; i < this.tbHeader.length; i++) {
          this.DatoModifica.push(this.Temp[this.tbHeader[i].key]);
        }
        this.MezziDataService.InviaIdUtente(values['id']).subscribe();
        break;
      case 'MODIFICA':
        this.Aggiungi(values);
        if (this.MezzoModel.casaCostr != "") {
          this.MezziDataService.AggiornaMezzo(this.MezzoModel).subscribe(
            response => {
              console.log(response);
              this.GetMezzi();
            },
            error => {
              console.log(error);
            }
          );
        };
        this.Ripulisci();
        this.ButtonAggiungi = true;
        this.DatoModifica = new Array();
        break;
      default:
        console.log("errore DEFAULT");
        break;
    }
  }
  

}
