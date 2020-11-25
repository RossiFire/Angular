import { Component, OnInit, Input, ViewChild, NgModule, OnChanges, Output, AfterViewChecked, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as _ from "lodash";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, OnChanges{
  
  constructor(private router : Router) {}
  privilegi;
  orderIcon : string = '<i class="fas fa-sort-up"></i>';
  @Input() tableConfig: TableConfig;
  @Input() DATA : any[];
  sliceData;
  @Output() notify : EventEmitter <Object> = new EventEmitter();

  ngOnChanges():void {
    this.sliceData = this.DATA.slice(0,3);
  }
  
  ngOnInit(): void {
    this.sliceData = this.DATA.slice(0, 3);
    this.privilegi = sessionStorage.getItem("privilegi");
  }


  //pagination
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

  // filtering
  col;
  FilterByColumn() : void{
    let colonna : TableHeader[] = _.filter(this.tableConfig.header, {'label' : this.col});
    this.sliceData = _.filter(this.DATA, [ colonna[0].key , this.tableConfig.search.value]);
  }


  // sorting
  ASC : boolean = true;
  SortBy(column) : void{
    let temp;
    if(this.ASC){
      this.sliceData = _.sortBy(this.DATA, [column]).reverse().slice(0,this.DATA.length);
      this.ASC = false;
    }else{
      this.sliceData = _.sortBy(this.DATA, [column]).slice(0,this.DATA.length);
      this.ASC = true
    }
  }

    // OutPut function/ CRUD operation
    EmitAdd(id, col : string, op : string): void{
      this.notify.emit({'id' : id , 'col' : col, 'op' : op});
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