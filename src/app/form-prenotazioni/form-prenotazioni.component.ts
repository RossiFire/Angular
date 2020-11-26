import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableHeader } from '../table/table.component';
import { MezzoModel } from 'src/MezzoModel';
import { UtenteModel } from '../UtenteModel';
import { PrenotazioniDataServiceService } from '../services/data/prenotazioni-data-service.service';

@Component({
  selector: 'app-form-prenotazioni',
  templateUrl: './form-prenotazioni.component.html',
  styleUrls: ['./form-prenotazioni.component.css']
})
export class FormPrenotazioniComponent implements OnInit {
  constructor(private PrenotazioniService : PrenotazioniDataServiceService) { }
  
  @Input() Header : TableHeader;
  @Input() valoriInseriti : any[] = new Array();
  @Input() formBottone : boolean;
  @Output() notify : EventEmitter <Object> = new EventEmitter();
  @Input() UtentiData : UtenteModel[];
  @Input() MezziData : MezzoModel[];

  UtentiSelect;
  MezziSelect;
  
  ngOnInit(): void {
    this.MezziSelect = this.MezziData;
    this.UtentiSelect = this.UtentiData;
  }

  dataId;
  sendValue(data : any[], col: string, op : string){
    this.notify.emit({'id' : this.valoriInseriti , 'col' : col , 'op' : op});
  }


  prova(id){
    alert(id);
  }

  

}
