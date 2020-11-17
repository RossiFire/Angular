import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ButtonComponent } from './button/button.component';
import { VistaUtentiComponent } from './vista-utenti/vista-utenti.component';
import { ErroreComponent } from './errore/errore.component';
import { ParcoAutoComponent } from './parco-auto/parco-auto.component';

const routes: Routes = [
  {path : "" , component : VistaUtentiComponent},
  {path : 'utenti' , component : VistaUtentiComponent},
  {path : 'prova' , component : ButtonComponent},
  {path : 'parcoauto' , component : ParcoAutoComponent},
  {path : '**' , component : ErroreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
