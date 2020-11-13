import { Component } from '@angular/core';
import { TableConfig, TableHeader, TableOrder, TableSearch, TablePagination } from '../app/table/table.component';
import { ButtonConfig } from '../app/button/button.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  tbHeader : TableHeader =  {key : 'Id', label : 'Nome'}
  tbOrder : TableOrder = {column : "id" , orderType : "ASC"}
  tbSearch : TableSearch = { columns : ["Nome"]}
  tbPagination : TablePagination = {itemPerPage : 3, itemPerPageOption : [3,6,10]}


  tbConfig : TableConfig = {
   header : this.tbHeader, order : this.tbOrder,
   search : this.tbSearch, pagination : this.tbPagination
  }
  
   btnConfig : ButtonConfig = {
    text : 'Bottone', icon : 'fas fa-sort-up', 
    customCss : {'background-color' : "red", 'color' : "yellow"}
  }

}
