import { Controller, Get } from '@nestjs/common';
import { TemporappService } from '../services/temporapp.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login Temporap')
@Controller('api/temporapp')
export class TemporappController {
  constructor(private temporappService: TemporappService) {}

  @Get('consulta')
  async hacerConsulta() {
    const respuesta = await this.temporappService.hacerConsulta();
    return respuesta;
  }
}
//   @Post('api/login-temporap')
//   async login(@Body() body: { usuario: string; clave: string }) {
//     const { usuario, clave } = body;
//     console.log('body',);
//     const isAuthenticated = await this.temporappService.validateUser(
//       usuario,
//       clave,
//     );

//     if (isAuthenticated) {
//       return { message: 'Autenticación exitosa' };
//     } else {
//       return { message: 'Credenciales incorrectas' };
//     }
//   }
