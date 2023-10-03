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


// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

// @Injectable()
// export class AdminGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {

//     const request = context.switchToHttp().getRequest();
//     const user = request;
//     console.log(request.rawHeaders[1])

//     if (user && user.role === 'Admin') {
//       return true;
//     }

//     return false;
//   }
// }


// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class AdminGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}
//   canActivate(context: ExecutionContext): boolean {
//     console.log("aca ando")
    
//     const request = context.switchToHttp().getRequest();
//     console.log(request)
//     const user = request.user; // Suponiendo que el usuario actual se encuentra en la propiedad 'user' de la solicitud

//     if (!user || user.role !== 'admin') {
//       return false; // El usuario no tiene el rol de 'admin', por lo que se deniega el acceso
//     }

//     return true; // El usuario tiene el rol de 'admin', por lo que se permite el acceso
//   }
// }


import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Obtén el usuario desde la solicitud
    const user = request.user; // Suponiendo que el usuario se almacena en req.user

    if (!user) {
      return false; // Si no hay usuario, la autorización falla
    }

    // Usa el servicio AuthService para obtener el rol del usuario
    const userRole = await this.authService.getUserRole(user.id);

    // Verifica si el rol es "Admin" (o el rol que uses para administradores)
    if (userRole === 'Admin') {
      return true; // Si el usuario es un administrador, la autorización es exitosa
    }

    return false; // Si el usuario no es un administrador, la autorización falla
  }
}
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