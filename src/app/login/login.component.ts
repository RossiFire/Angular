import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private router : Router) { }
  ngOnInit(): void {
  }

  username = ''
  password = ''
  autenticato = true;
  errore = "Spiacente, nome o password sbagliata";
  privilegi = true;

  Check() : void{
    if(this.username.toLowerCase === 'Daniele'.toLowerCase && this.password === 'admin'){
      sessionStorage.setItem("utente", this.username);
      sessionStorage.setItem("privilegi", this.privilegi.toString());
      this.router.navigate(['utenti']);
    }else{
      this.autenticato = false;
    }
  }




  ngOnDestroy(): void{
    this.username = ''
    this.password = ''
  }

}
