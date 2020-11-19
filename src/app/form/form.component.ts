import { Component, OnInit, Input, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeader } from '../table/table.component';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {

  }
  @Output() notify : EventEmitter <Object> = new EventEmitter();

  @Input() header : TableHeader;
  @Input() valoriInseriti : any[] = new Array();
  @Input() formBottone : boolean;

  dataId;
  sendValue(data : any[], col: string, op : string){
    this.notify.emit({'id' : this.valoriInseriti , 'col' : col , 'op' : op});
  }

}
