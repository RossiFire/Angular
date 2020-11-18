import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-utente',
  templateUrl: './info-utente.component.html',
  styleUrls: ['./info-utente.component.css']
})
export class InfoUtenteComponent implements OnInit {

  constructor(private router : ActivatedRoute) { }
  ngOnInit(): void {
    //  this.userAttuale = this.router.snapshot.params['userAttuale'];
  }

  userAttuale = { 'id' : '1', 'nome' : 'Daniele', 'cognome' : 'Rosh', 'password' : 'ciap'};

  
}
