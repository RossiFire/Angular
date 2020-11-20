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
  privilegi = true;

  Check() : void{
    if(this.username.toLowerCase === 'Daniele'.toLowerCase && this.password === 'admin'){
      sessionStorage.setItem("UsernameAttuale", this.username);
      sessionStorage.setItem("privilegi", this.privilegi.toString());
      this.router.navigate(['utenti']);
    }else{
      sessionStorage.setItem("UsernameAttuale", this.username);
      this.privilegi = false;
      sessionStorage.setItem("privilegi", this.privilegi.toString());
      this.router.navigate(['utenti']);
    }
  }




  ngOnDestroy(): void{
    this.username = ''
    this.password = ''
  }

}
