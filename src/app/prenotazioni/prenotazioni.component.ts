import { Component, OnInit } from '@angular/core';
import { TableConfig, TableHeader, TableOrder, TableSearch, TablePagination} from '../table/table.component';
import { ButtonConfig } from '../button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }


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

    tbData = [
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


}
