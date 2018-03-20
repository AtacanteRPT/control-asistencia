import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Socket } from 'ng-socket-io';
import 'rxjs/add/operator/map';

@Injectable()
export class AsistenciaService {

  event:string='message';
  constructor(
    private socket:Socket,
    private http : HttpClient
  ) { 
  }

url = "http://localhost:1337/asistencia/cambioHora";

 headers=new HttpHeaders().set('Content-Type','application/json');

  sendMessage(msg:string){
    console.log("Envio");
    this.socket.emit(this.event,msg);
  }

  getPersonas():any{
    return this.socket
      .fromEvent<any>(this.event)
      .map( data => {
        console.log(data)
        return data;
      });
  }

cambioHora(hora){
    return this.http.post(this.url,JSON.stringify(hora),{headers:this.headers});
  }

  getPersona() {
    return this.socket
        .fromEvent<any>(this.event)
        .map(data => data.msg );
}

  close(){
    this.socket.disconnect();
  }

}

