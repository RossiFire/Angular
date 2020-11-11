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
  tbOrder : TableOrder = {column : "colonna" , orderType : "ASC"}
  tbSearch : TableSearch = { columns : ["parola1","parola2","parola3"]}
  tbPagination : TablePagination = {itemPerPage : 10, itemPerPageOption : [1,2,3,4]}
  


  tbConfig : TableConfig = 
  {header : this.tbHeader, order : this.tbOrder,
   search : this.tbSearch, pagination : this.tbPagination }
  btnConfig : ButtonConfig = 
  {text : 'Bottone', icon : '<mat-icon aria-hidden="false" aria-label="Example home icon">home</mat-icon>', 
  customCss : "pericolo"}

}
