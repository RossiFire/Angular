import { Component, OnInit, Input } from '@angular/core';
import { TbData } from '../TableInfo';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

  id : number
  name : string
  //@Input() tbInfo : TbData;
  @Input() tableConfig : TableConfig;
  @Input() data : any[];

}

export class TableConfig{
  header : TableHeader;
/*   order : TableOrder;
  search : TableSearch;
  pagination : TablePagination;  */
}

export class TableHeader{
  key : string;
  label : string;
}

export class TableOrder{
  column : string;
  orderType : string;
}

export class TableSearch{
  columns : string[];
}

export class TablePagination{
  itemPerPage : number;
  itemPerPageOption : number[];
}