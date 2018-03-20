import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilAsistenciaComponent } from './perfil-asistencia/perfil-asistencia.component';

const routes: Routes = [
  {path:"",component:PerfilAsistenciaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
