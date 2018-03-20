import { Component, OnInit,OnDestroy } from '@angular/core';
import { AsistenciaService }  from '../asistencia.service';
import { QRCodeComponent } from 'angular2-qrcode';
import { Perfil } from './perfil'; 
import {Hora} from './hora';

@Component({
  selector: 'app-perfil-asistencia',
  templateUrl: './perfil-asistencia.component.html',
  styleUrls: ['./perfil-asistencia.component.css']
})
export class PerfilAsistenciaComponent implements OnInit,OnDestroy {

  tipoInstitucion="UNIDAD EDUCATIVO";
  nombrePrimario="DOMINGO";
  nombreSecundario="SAVIO";
  perfil:Perfil=new Perfil();
  img="./assets/img/fondof.png"
  imgPatter="https://image.freepik.com/free-vector/abstract-background-with-a-3d-pattern_1319-68.jpg"
  imgBackground="./assets/img/fondof.png"
  qr:string;
  fnc:any;
  constructor(
    private serve:AsistenciaService
  ) { 

  }

  getPerfil(){

    this.serve.getPersonas().subscribe(data=>{
      console.log(data);
      this.perfil.nroMatricula=data.identificacion;
        this.perfil.paterno=data.paterno;
        this.perfil.materno=data.materno;
        this.perfil.nombre=data.nombre;
        this.perfil.curso=data.curso;
        this.perfil.turno=data.turno;
        this.perfil.img=data.img;
        this.perfil.qr=data.identificacion;
        this.perfil.hora_llegada= data.hora_llegada;
        this.perfil.hora_salida= data.hora_salida;
    },err=>{
      console.error(err)
    })
  }

  model = new Hora('09:00','12:00');

  submitted = false;

  onSubmit() { this.submitted = true; }

  cambioHora() {
    console.log(this.model)
    this.serve.cambioHora(this.model).subscribe(respuesta=>{
      alert(respuesta)
    },err=>{
      console.error(err);
    })
  }

  ngOnInit() {
  this.getPerfil();
  }

  ngOnDestroy(){
    clearInterval(this.fnc);
  }

}

