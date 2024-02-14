/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/modules/users/dto/loginUser.dto';
import { Roles } from '../roles/entities/roles.entity';
import * as bcrypt from 'bcryptjs';
import {RolesService} from "../roles/services/roles.service";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private usersService: UsersService,
    private rolesService: RolesService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      let role;
      if (user.role) {
        role = await this.rolesService.findOne(user.role);
      }

      let userAdmin = await this.adminModel.findOne({user : user._id}).exec();
 
      const payload = { id: user._id, email: user.email, role: user.role ? user.role : '', roleKey: role ? role.role_key : '', userAdmin: userAdmin ? userAdmin._id : ''};
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
  
  async getUserRole(userId: string): Promise<Roles> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return user.role;
  }
}

