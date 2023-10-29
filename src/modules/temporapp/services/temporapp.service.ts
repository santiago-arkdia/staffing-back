import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TemporappService {
  private readonly apiUrl = 'http://34.214.124.124:9896/ws/usuarios/login';
  private readonly usuario = process.env.USUARIO_TEMPORAPP;
  private readonly contrasena = process.env.CLAVE_TEMPORAPP;

  async hacerConsulta() {
    const datos = {
      usuario: this.usuario,
      clave: this.contrasena,
    };

    const respuesta = await axios.post(this.apiUrl, datos);
    return respuesta.data;
  }
}
