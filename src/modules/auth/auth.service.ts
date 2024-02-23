/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, LoginExternalDto } from 'src/modules/users/dto/loginUser.dto';
import { Roles } from '../roles/entities/roles.entity';
import * as bcrypt from 'bcryptjs';
import {RolesService} from "../roles/services/roles.service";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../admin/entities/admin.entity';
import { UsersExternalService } from '../users-externals/services/users-externals.service';
import { Collaborator } from '../collaborators/entities/collaborators.entity';
import { Client } from '../clients/entities/client.entity';
import { Payroll } from '../payroll-user/entities/payroll-user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    @InjectModel(Collaborator.name) private readonly collaboratorModel: Model<Collaborator>,
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(Payroll.name) private readonly payrollModel: Model<Payroll>,
    private usersService: UsersService,
    private usersExternalService: UsersExternalService,
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

      let userEntity;

      switch (role.role_key) {
        case 'admin_payroll':
          userEntity = await this.payrollModel.findOne({user : user._id}).exec();
        break;
        case 'client':
          userEntity = await this.clientModel.findOne({user : user._id}).exec();
        break;
        case 'collaborator':
          userEntity = await this.collaboratorModel.findOne({user : user._id}).exec();
        break;
        default:
          userEntity = await this.adminModel.findOne({user : user._id}).exec();
      }

      const payload = { id: user._id, email: user.email, role: user.role ? user.role : '', roleKey: role ? role.role_key : '', userEntity: userEntity ? userEntity._id : ''};
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }


  async signInExternal(loginExternalDto: LoginExternalDto) {
    const { user, password } = loginExternalDto;
    const dataUser = await this.usersExternalService.findByUser(user);

    if (user && bcrypt.compareSync(password, dataUser.password)) {
 
      const payload = { id: dataUser._id, user: dataUser.user };
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

