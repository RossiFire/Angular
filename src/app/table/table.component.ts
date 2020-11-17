import { Component, OnInit, Input, AfterViewInit, ViewChild, NgModule, OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as _ from "lodash";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  
  constructor() {}
  ngOnInit(): void {
    this.sliceData = this.DATA.slice(0, 3);
    this.inseriti = new Array(this.tableConfig.header.length);
  }
  
  orderIcon : string = '<i class="fas fa-sort-up"></i>';
  
  @Input() tableConfig: TableConfig;
  
  @Input() DATA : any[];
  sliceData;



  //nuovi dati
  inseriti : any[];
  AddElement() : void{
    let newDato : any[] = [];
      for(let i = 0; i<this.tableConfig.header.length ; i++){
        newDato.push({[this.tableConfig.header[i].key] : this.inseriti[i]});
      }

    var result = {};
      for (var i = 0; i < newDato.length; i++) {
        result[this.tableConfig.header[i].key] = newDato[i][this.tableConfig.header[i].key];
      }
    this.DATA.push(result);
  }


  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = event.pageIndex + event.pageSize;
    if (endIndex > this.DATA.length) {
      endIndex = this.DATA.length;
    }
    this.sliceData = this.DATA.slice(startIndex, endIndex);
    switch (event.pageIndex) {
      case 0:
        this.sliceData = this.DATA.slice(0, event.pageSize);
      case 1:
        this.sliceData = this.DATA.slice(event.pageSize, event.pageSize + event.pageSize);
      case 2:
        this.sliceData = this.DATA.slice(event.pageSize * event.pageIndex, event.pageSize * event.pageIndex + event.pageSize);
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
      this.sliceData = _.sortBy(this.DATA, [column]).reverse().slice(0,this.DATA.length);
      this.ASC = false;
    }else{
      this.sliceData = _.sortBy(this.DATA, [column]).slice(0,this.DATA.length);
      this.ASC = true
    }
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