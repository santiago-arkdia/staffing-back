/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/modules/users/dto/loginUser.dto';
import { Roles } from '../roles/entities/roles.entity';
import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    
    const payload = { id: user._id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  
  async getUserRole(userId: string): Promise<Roles> {
    // Recupera el usuario por su ID desde tu servicio de usuarios
    const user = await this.usersService.findOne(userId);

    // Verifica si se encontró un usuario
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Devuelve el rol del usuario
    return user.role; // Asume que la propiedad 'role' existe en tu modelo de usuario
  }
}

