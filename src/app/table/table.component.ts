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
  DataList : {id : number, nome : string, cognome : string, nascita : string}[] = DatiUtenti;

  constructor() {}
  ngOnInit(): void {}

  
  orderIcon : string = '<i class="fas fa-sort-up"></i>';
  sliceData = this.DataList.slice(0, 3);

  @Input() tableConfig: TableConfig;

 // @Input() DATA;





  newId : number;
  newNome : string;
  newCognome : string;
  newNascita : string;
  AddElement() : void{
    this.DataList.push({id : this.newId, nome : this.newNome, cognome : this.newCognome, nascita : this.newNascita});
  }


  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = event.pageIndex + event.pageSize;
    if (endIndex > this.DataList.length) {
      endIndex = this.DataList.length;
    }
    this.sliceData = this.DataList.slice(startIndex, endIndex);
    switch (event.pageIndex) {
      case 0:
        this.sliceData = this.DataList.slice(0, event.pageSize);
      case 1:
        this.sliceData = this.DataList.slice(event.pageSize, event.pageSize + event.pageSize);
      case 2:
        this.sliceData = this.DataList.slice(event.pageSize * event.pageIndex, event.pageSize * event.pageIndex + event.pageSize);
    }
  }

  col;
  FilterByColumn() : void{
    let colonna : TableHeader[] = _.filter(this.tableConfig.header, {'label' : this.col});
    this.sliceData = _.filter(this.sliceData, [ colonna[0].key , this.tableConfig.search.value]);
    console.log(this.sliceData);
  }

  ASC : boolean = true;
  SortBy(column, event : PageEvent) : void{
    let temp;
    if(this.ASC){
      this.sliceData = _.sortBy(this.DataList, [column]).reverse().slice(0,this.DataList.length);
      this.ASC = false;
    }else{
      this.sliceData = _.sortBy(this.DataList, [column]).slice(0,this.DataList.length);
      this.ASC = true
    }
    console.log(temp);
  }



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