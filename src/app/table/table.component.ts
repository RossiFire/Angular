import { Component, OnInit, Input } from '@angular/core';
import { tbDATA, TbData } from '../TableInfo';
import { PageEvent } from '@angular/material/paginator';
import { findSafariExecutable } from 'selenium-webdriver/safari';
import { filter } from 'minimatch';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})




export class TableComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

  newId : number;
  newValue : string;
  newDato : TbData;
  orderIcon : string = '<i class="fas fa-sort-up"></i>';
  DATA = tbDATA;
  filterData :TbData[] = [];
  sliceData = this.DATA.slice(0, 3);
  @Input() tableConfig: TableConfig;


  AddElement() : void{
    this.newDato = {key : this.newId, label : this.newValue}
    this.DATA.push(this.newDato); 
    this.tableConfig.pagination.itemPerPageOption = [3,6,9, this.DATA.length];
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


  FilterByColumn(): void {
    this.sliceData = this.DATA;
    if (this.tableConfig.search.column.toUpperCase() === this.tableConfig.header.key.toUpperCase()) {
      for (let i = 0; i < this.DATA.length; i++) {
        if (this.DATA[i].key === this.tableConfig.search.value) {
          this.filterData.push(this.DATA[i]);
        }
      }
      this.sliceData = this.filterData;
    } else
    if (this.tableConfig.search.column.toUpperCase() === this.tableConfig.header.label.toUpperCase()) {
        for (let i = 0; i < this.DATA.length; i++) {
          if (this.DATA[i].label === this.tableConfig.search.value) {
            this.filterData.push(this.DATA[i]);
          }
        }
        this.sliceData = this.filterData;
      }else{
        this.sliceData = this.DATA.slice(0, 3);
      } 
        
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
  column: string;
  value : any;
}

export class TablePagination {
  itemPerPage: number;
  itemPerPageOption: number[];
}