import { Component, OnInit } from '@angular/core';
import { TableConfig, TableHeader, TableOrder , TablePagination, TableSearch } from '../table/table.component';
import { Route, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-parco-auto',
  templateUrl: './parco-auto.component.html',
  styleUrls: ['./parco-auto.component.css']
})
export class ParcoAutoComponent implements OnInit {

  constructor(private route : Router) { }

  ngOnInit(): void {
  }


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

    tbData = [
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

}
