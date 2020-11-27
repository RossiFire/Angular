import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UtentiDataService } from '../services/data/utenti-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private router : Router, private utentiDataService : UtentiDataService) { }
  ngOnInit(): void {
  }

  Username = ''
  Password = ''
  privilegi = false;
  idInMemoria

  errore = "";
  Check() : void{

    this.utentiDataService.ControllaDiritti(this.Username, this.Password).subscribe(
      response=>{
        if(response){
          sessionStorage.setItem("UsernameAttuale", this.Username);
          this.privilegi = true;
          sessionStorage.setItem("privilegi", this.privilegi.toString());
          this.router.navigate(['utenti']);
        }else{
          sessionStorage.setItem("UsernameAttuale", this.Username);
          sessionStorage.setItem("privilegi", this.privilegi.toString());
          this.router.navigate(['utenti']);
        }
        this.utentiDataService.GetIdUtente(this.Username, this.Password).subscribe(
          response=>{
            this.idInMemoria = response;
            sessionStorage.setItem("IdUtenteAttuale", this.idInMemoria);
          },
          error=>{
            alert("Errore sconosciuto");
          }
        );
      },
      error=>{
        this.errore = "User o password sbagliata";
      }
    );
  }


  ngOnDestroy(): void{
    this.Username = ''
    this.Password = ''
  }

}
