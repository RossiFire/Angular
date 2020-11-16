import { Component, OnInit, Input, AfterViewInit, ViewChild, NgModule } from '@angular/core';
import { tbDATA, TbData } from '../TableInfo';
import { PageEvent } from '@angular/material/paginator';
import  DatiUtenti from '../files/DatiUtenti.json';
import * as _ from "lodash";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  
  //get data from json file
  // DataList : {key : string, value : any}[] = DatiUtenti;

  constructor() {
   }

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
  sliceData = this.valoriDati.slice(0, 3);

  @Input() tableConfig: TableConfig;

  @Input() DATA;

  pp() : void{
    console.log("i dati sono " + this.DATA);
  }




  newId : number;
  newValue : string;
  newDato : Temp[];
  AddElement() : void{
/*     this.newDato = {key : this.newId, label : this.newValue}
    this.valoriDati.push(this.newDato); 
    this.tableConfig.pagination.itemPerPageOption = [3,6,9, this.DATA.length]; */
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



  SortBy(value) : void{
    let temp = _.sortBy(this.DATA, ['key']);
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