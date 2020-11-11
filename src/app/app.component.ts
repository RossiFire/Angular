import { Component } from '@angular/core';
import { TableConfig, TableHeader, TableOrder } from '../app/table/table.component';
import { ButtonConfig } from '../app/button/button.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  tbHeader : TableHeader =  {key : 'Id', label : 'Nome'}
  tbConfig : TableConfig = {header : this.tbHeader}

  
  btnConfig : ButtonConfig = {text : 'Bottone'}
  

}
