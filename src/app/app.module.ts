import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { TableComponent } from './table/table.component';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { VistaUtentiComponent } from './vista-utenti/vista-utenti.component';
import { FooterComponent } from './footer/footer.component';
import { ErroreComponent } from './errore/errore.component';
import { InfoUtenteComponent } from './info-utente/info-utente.component';
import { ParcoAutoComponent } from './parco-auto/parco-auto.component';
import { PrenotazioniComponent } from './prenotazioni/prenotazioni.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import { FormPrenotazioniComponent } from './form-prenotazioni/form-prenotazioni.component';
import { AuthInterceptService } from './services/http/auth-intercept.service';
import { UtentiDataService } from './services/data/utenti-data.service';
@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    TableComponent,
    NavbarComponent,
    VistaUtentiComponent,
    FooterComponent,
    ErroreComponent,
    InfoUtenteComponent,
    ParcoAutoComponent,
    PrenotazioniComponent,
    LoginComponent,
    FormComponent,
    FormPrenotazioniComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptService, multi : true},
    UtentiDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
