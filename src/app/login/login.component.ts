import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UtentiDataService } from '../services/data/utenti-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  constructor(private router : Router, private utentiDataService : UtentiDataService) { }


  /*----------------- Credeniali utente -------------------*/ 
  /*------------------------------------------------------ */
  Username = ''
  Password = ''
  idInMemoria
  privilegi = false;


  /*------------------- Altre variabili -------------------*/ 
  /*------------------------------------------------------ */
  errore = "";



  /*--------------------- LifeCycles ----------------------*/ 
  /*------------------------------------------------------ */
  ngOnDestroy(): void{
    this.Username = ''
    this.Password = ''
  }


  /*------------------ Controllo Login --------------------*/ 
  /*------------------------------------------------------ */
  Check(): void {
    this.utentiDataService.ControllaDiritti(this.Username, this.Password).subscribe(
      response => {
        if (response) {
          sessionStorage.setItem("UsernameAttuale", this.Username);
          this.privilegi = true;
          sessionStorage.setItem("privilegi", this.privilegi.toString());
          this.router.navigate(['utenti']);
        } else {
          sessionStorage.setItem("UsernameAttuale", this.Username);
          sessionStorage.setItem("privilegi", this.privilegi.toString());
          this.router.navigate(['utenti']);
        }
        this.utentiDataService.GetIdUtente(this.Username, this.Password).subscribe(
          response => {
            this.idInMemoria = response;
            sessionStorage.setItem("IdUtenteAttuale", this.idInMemoria);
          },
          error => {
            alert("Errore sconosciuto");
          }
        );
      },
      error => {
        this.errore = "User o password sbagliata";
      }
    );
  }


  isAuth(){
    if(sessionStorage.getItem("UsernameAttuale") === null || sessionStorage.getItem("UsernameAttuale") === ""){
      return false
    }else{
      return true
    }
  }

  getAuthNome(){
    return sessionStorage.getItem("UsernameAttuale");
  }

  LogOut(){
    sessionStorage.clear();
    this.router.navigate([""]);
  }


}
