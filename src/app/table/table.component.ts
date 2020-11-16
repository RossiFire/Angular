import { Component, OnInit, Input, AfterViewInit, ViewChild, NgModule } from '@angular/core';
import { tbDATA, TbData } from '../TableInfo';
import { PageEvent } from '@angular/material/paginator';
import { findSafariExecutable } from 'selenium-webdriver/safari';
import { filter } from 'minimatch';
import { MatSortModule } from '@angular/material/sort' ;
import { sortBy } from 'lodash';
import * as _ from "lodash";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

  valoriDati : Temp[] = [
    {valori :[ 1, "Daniele", "Rossino", "10/09/2001"]},
    {valori :[ 2, "Giacomo", "Leopardi", "12/09/2001"]},
    {valori :[ 3, "Alice", "Sender", "13/05/2001"]},
    {valori :[ 4, "Bob", "Mani", "02/12/2002"]},
    {valori :[ 5, "Mallory", "Hackerman", "12/03/1992"]},
]




  
  orderIcon : string = '<i class="fas fa-sort-up"></i>';
  DATA = tbDATA;
  filterData :TbData[] = [];
  sliceData = this.valoriDati.slice(0, 3);
  @Input() tableConfig: TableConfig;




  newId : number;
  newValue : string;
  newDato : TbData;
  AddElement() : void{
    this.newDato = {key : this.newId, label : this.newValue}
    this.DATA.push(this.newDato); 
    this.tableConfig.pagination.itemPerPageOption = [3,6,9, this.DATA.length];
  }


  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = event.pageIndex + event.pageSize;
    if (endIndex > this.valoriDati.length) {
      endIndex = this.valoriDati.length;
    }
    this.sliceData = this.valoriDati.slice(startIndex, endIndex);
    switch (event.pageIndex) {
      case 0:
        this.sliceData = this.valoriDati.slice(0, event.pageSize);
      case 1:
        this.sliceData = this.valoriDati.slice(event.pageSize, event.pageSize + event.pageSize);
      case 2:
        this.sliceData = this.valoriDati.slice(event.pageSize * event.pageIndex, event.pageSize * event.pageIndex + event.pageSize);
    }
  }

  FilterByColumn(column : string): void {
    let exist : boolean = false;
    let i;
    for(i = 0; i< this.tableConfig.header.length; i++){
      if(column.toUpperCase() === this.tableConfig.header[i].label){
        exist = true;
        break;
      }
    }
    if(exist){
      for(let j = 0; j< this.valoriDati.length; j++){
      }
    }
  } 


  
  FCKNDATA : TbData[] =[
  {key: 5, label: "ciao"},
  {key: 1, label: "ccc"},
  {key: 4, label: "apsf"},
  {key: 6, label: "sdago"},
  {key: 8, label: "sdasafgo"},
  {key: 16, label: "sgo"},
  {key: 64, label: "aed"}
]

  SortBy(value) : void{
    let temp = _.sortBy(this.FCKNDATA, ['key']);
    console.log(temp);
  }



}








export class Temp{
  valori : any[];
}


export class TableDataFormat{
  column : string;
  value : any;
}


export class TableConfig {
  header: TableHeader[];
  order: TableOrder;
  search: TableSearch;
  pagination: TablePagination;
}

export class TableHeader {
   key: string;
  label: string;
}

export class TableOrder {
  column: string;
  orderType: string;
}

export class TableSearch {
  column: string;
  value : any;
}

export class TablePagination {
  itemPerPage: number;
  itemPerPageOption: number[];
}