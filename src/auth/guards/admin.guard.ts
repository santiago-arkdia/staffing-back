/* eslint-disable prettier/prettier */
// // auth/guards/admin.guard.ts

// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

// @Injectable()
// export class AdminGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     // Obtenemos el usuario actual de la solicitud
//     const request = context.switchToHttp().getRequest();
//     const user = request.user; // Asumiendo que tienes un objeto de usuario en la solicitud

//     // Verificamos si el usuario tiene el rol de "Admin"
//     if (user && user.role === 'Admin') {
//       return true; // Permite el acceso al servicio
//     }

//     return false; // Deniega el acceso al servicio
//   }
// }
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

// @Injectable()
// export class AdminGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;

//     if (user && user.role === 'Admin') {
//       return true;
//     }

//     return false;
//   }
// }

// @Injectable()
// export class NoopGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     return true; // Este guardia permite el acceso sin restricciones
//   }
// }

// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

// @Injectable()
// export class AdminGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     const user = request;
//     console.log(request.rawHeaders[1])
//     // console.log(user)

//     if (user && user.role === 'Admin') {
//       return true;
//     }

//     return false;
//   }
// }


import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request;
    console.log(request.rawHeaders[1])
    // console.log(user)

    if (user && user.role === 'Admin') {
      return true;
    }

    return false;
  }
}


// import { Controller, Get, Request, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '../auth.guard';
// import { AuthController } from '../auth.controller'; // Asegúrate de importar el servicio AuthService

// @Controller('auth')
// export class AdminGuard {
//   constructor(private authService: AuthController) {} // Inyecta el servicio AuthService

//   @UseGuards(AuthGuard)
//   @Get('profile')
//   async getProfile(@Request() req) {
//     try {
//       // Obtén el usuario desde la solicitud
//       const user = req.user; // Suponiendo que el usuario se almacena en req.user

//       if (user) {
//         // Si hay un usuario en la solicitud, obtén su rol utilizando el servicio AuthService
//         const userRole = await this.authService.getProfile(user.id); // Supongamos que tienes un método getUserRole en AuthService

//         if (userRole === 'Admin') {
//           // Realiza la lógica para usuarios administradores
//           return 'Perfil de administrador';
//         } else {
//           // Realiza la lógica para otros roles
//           return 'Perfil de otro tipo de usuario';
//         }
//       } else {
//         return 'No se encontró un usuario en la solicitud';
//       }
//     } catch (error) {
//       // Maneja errores si es necesario
//       throw error;
//     }
//   }
// }

// auth.guard.ts

// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<string[]>('roles', context.getHandler());

//     if (!roles) {
//       return true; // Si no se especifica un rol, se permite el acceso
//     }

//     const request = context.switchToHttp().getRequest();
//     const user = request.user; // Asumiendo que tienes un objeto de usuario en la solicitud

//     if (!user) {
//       return false; // Denegar el acceso si el usuario no está autenticado
//     }

//     Verificar si el usuario tiene uno de los roles permitidos
//     if (roles.includes(user.role)) {
//       return true; // Permitir el acceso si el rol coincide
//     }

//     return false; // Denegar el acceso si el rol no coincide
//   }
// }