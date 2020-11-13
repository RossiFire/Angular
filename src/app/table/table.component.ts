import { Component, OnInit, Input } from '@angular/core';
import { tbDATA, TbData } from '../TableInfo';
import { PageEvent } from '@angular/material/paginator';
import { findSafariExecutable } from 'selenium-webdriver/safari';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})




export class TableComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    console.log(this.newValue)
  }

  newId : number;
  newValue : string;
  newDato : TbData;
  orderIcon : string = '<i class="fas fa-sort-up"></i>';
  DATA = tbDATA;
  @Input() tableConfig: TableConfig;


  AddElement() : void{
    this.newDato = {key : this.newId, label : this.newValue}
    this.DATA[this.DATA.length] = this.newDato; 
    this.tableConfig.pagination.itemPerPageOption = [3,6,9, this.DATA.length];
  }


  sliceData = this.DATA.slice(0, 3);
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


  OrderById() {
    if (this.tableConfig.order.orderType === "ASC") {
      this.tableConfig.order.orderType = "DESC";
      this.orderIcon = '<i class="fas fa-sort-down"></i>'
      for(let j = 1; j<this.sliceData.length; j++){
        for (let i = 0; i < this.sliceData.length - 1; i++) {
          if (this.sliceData[i].key < this.sliceData[j].key) {
            let temp = this.sliceData[i];
            this.sliceData[i] = this.sliceData[j];
            this.sliceData[j] = temp;
          }
        }
      }
    } else {
      this.tableConfig.order.orderType = "ASC";
      this.orderIcon = '<i class="fas fa-sort-up"></i>'
      for(let j = 1; j< this.sliceData.length; j++){
        for (let i = 0; i < this.sliceData.length - 1; i++) {
          if (this.sliceData[i].key > this.sliceData[j].key) {
            let temp = this.sliceData[j];
            this.sliceData[j] = this.sliceData[i];
            this.sliceData[i] = temp;
          }
        }
      }
    }
  }

  tbExist : boolean = true;
  FilterByColumn(colonna : string) : void{
    for(let i=0; i<this.tableConfig.search.columns.length; i++){
      if(this.tableConfig.search.columns[i] === colonna){
        this.tbExist = false;
      }
    }
    this.tbExist = true;
  }



}








export class TableConfig {
  header: TableHeader;
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
  columns: string[];
}

export class TablePagination {
  itemPerPage: number;
  itemPerPageOption: number[];
}