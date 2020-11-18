import { Component, OnInit, AfterViewInit} from '@angular/core';
import { TableConfig, TableHeader, TableOrder, TableSearch, TablePagination} from '../table/table.component';
import { ButtonConfig } from '../button/button.component';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-vista-utenti',
  templateUrl: './vista-utenti.component.html',
  styleUrls: ['./vista-utenti.component.css']
})
export class VistaUtentiComponent implements OnInit{
  constructor(private route : Router) { }
  ngOnInit(): void {

  }


  tbOrder : TableOrder = {column : "id" , orderType : "ASC"}
  tbSearch : TableSearch = { column : "" , value : ""}
  tbPagination : TablePagination = {itemPerPage : 3, itemPerPageOption : [3,6,10]}
  
  
    tbHeader : TableHeader[] =  [
      { key : "id", label : "ID"},
      { key : "nome", label : "Nome"},
      { key : "cognome", label : "Cognome"},
      { key : "nascita", label : "Anno di Nascita"}
    ]

    tbData = [
      {
        "id" : "1",
        "nome" : "Daniele",
        "cognome" : "Rossino",
        "nascita" : "10/09/2001"
      },
      {
        "id" : "2",
        "nome" : "Alice",
        "cognome" : "Senders",
        "nascita" : "12/02/2000"
      },
      {
        "id" : "3",
        "nome" : "Bob",
        "cognome" : "Mani",
        "nascita" : "20/11/1999"
      },
      {
        "id" : "4",
        "nome" : "Josh",
        "cognome" : "Bosh",
        "nascita" : "12/01/1979"
      },
      {
        "id" : "5",
        "nome" : "Mallory",
        "cognome" : "Hackerman",
        "nascita" : "10/09/1980"
      },
    ]

  
  
  tbConfig : TableConfig = {
    header : this.tbHeader, order : this.tbOrder,
    search : this.tbSearch, pagination : this.tbPagination
  }
  

  btnConfig : ButtonConfig = {
    text : 'Bottone', icon : '<i class="fas fa-rocket"></i>', 
    customCss : {'background-color' : "red", 'color' : "yellow"}
  }

}