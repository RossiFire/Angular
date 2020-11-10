import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }

  @Input() tableConfig : TableConfig;
  @Input() data : any[];

}

export class TableHeader{
  key : string;
  label : string;
}

export class TableConfig{
  header : TableHeader[];
}
