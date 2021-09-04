import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findByEmail(createUserDto.email);
    console.log(userExists);
    if (userExists) {
      throw new HttpException(`User  already exists`, HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(createUserDto.password, salt);
    const updatedUser = { ...createUserDto, password: hashedPassword };
    const createdUser = await this.usersService.create(updatedUser);
    const payload = { userName: createdUser.userName, sub: createdUser.id };

    return {
      user: createdUser,
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    let user: User;

    user = await this.usersService.findByEmail(email);

    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (isPasswordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { userName: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
