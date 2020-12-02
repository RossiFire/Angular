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
  
  /*--------------- Output Operazioni CRUD ----------------*/ 
  /*------------------------------------------------------ */
  @Output() notify : EventEmitter <Object> = new EventEmitter();
  
  @Output() resetModificaButton : EventEmitter <Object> = new EventEmitter();

  /*-------------- Config/Precompila input ----------------*/ 
  /*------------------------------------------------------ */
  @Input() Header : TableHeader;
  @Input() valoriInseriti : any[] = new Array();
  @Input() formBottone : boolean;
  @Input() UtentiData : UtenteModel[];
  @Input() MezziData : MezzoModel[];

  @Input() IdUtentePrenotato;
  @Input() IdMezzoPrenotato;
  UtentiSelect;
  MezziSelect;
  


  /*--------------------- LifeCycles ----------------------*/ 
  /*------------------------------------------------------ */
  ngOnInit(): void {
    this.MezziSelect = this.MezziData;
    this.UtentiSelect = this.UtentiData;
  }


  
  /*----------- Invio Dati ai componenti padri ------------*/ 
  /*------------------------------------------------------ */
  sendValue(data : any[], col: string, op : string){
    this.notify.emit({'id' : this.valoriInseriti , 'col' : col , 'op' : op, 'IdUtenteModifica' : this.IdUtentePrenotato, 'IdMezzoModifica' : this.IdMezzoPrenotato});
  }


  SendButtonReset(){
    this.valoriInseriti = [];
    this.resetModificaButton.emit({'value' : false});
  }


  

}
