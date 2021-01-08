import { Component, OnInit, Input, Output, DoCheck} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeader } from '../table/table.component';
import { EventEmitter } from '@angular/core';
import { UtenteModel } from '../UtenteModel';
import { MezzoModel } from 'src/MezzoModel';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent{
  constructor() {}

  /*--------------- Output Operazioni CRUD ----------------*/ 
  /*------------------------------------------------------ */
  @Output() notify : EventEmitter <Object> = new EventEmitter();
  @Output() ModificaFormReset : EventEmitter <Object> = new EventEmitter()
 
  /*---------------- Set/Precompila Form ------------------*/ 
  /*------------------------------------------------------ */
  @Input() header : TableHeader;
  @Input() valoriInseriti : any[] = new Array();
  @Input() formBottone : boolean;
  
  
  sendValue(data : any[], col: string, op : string){
    this.notify.emit({'id' : this.valoriInseriti , 'col' : col , 'op' : op});
  }


  ButtonReset(){
    this.ModificaFormReset.emit({'value' : false});
    this.valoriInseriti = [];
  }

}
