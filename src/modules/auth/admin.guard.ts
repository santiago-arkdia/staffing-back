/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles || !roles.includes('Admin')) {
      return true; // No se requiere autenticación de administrador para esta ruta
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('No se proporcionó un token de autenticación', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.substring(7);

    try {
      const decoded = this.jwtService.verify(token);

      if (!decoded || !decoded.role || decoded.role !== 'Admin') {
        throw new HttpException('No tienes permiso para acceder a este recurso', HttpStatus.FORBIDDEN);
      }

      // Verifica la expiración del token si es relevante para tu aplicación
      const currentTime = Date.now() / 1000; // Tiempo actual en segundos
      if (decoded.exp && decoded.exp < currentTime) {
        throw new HttpException('El token JWT ha expirado', HttpStatus.UNAUTHORIZED);
      }

      return true; // Usuario autenticado como administrador
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new HttpException('El token JWT ha expirado', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Token JWT no válido', HttpStatus.UNAUTHORIZED);
    }
  }
}