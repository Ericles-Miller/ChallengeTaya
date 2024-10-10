import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PayloadUserDTO } from 'src/users/dto/payload-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userId: number) {
    const user = await this.usersService.findOne(userId);
    if(!user)
      throw new UnauthorizedException();

    return user;
  }

  async login(user: PayloadUserDTO) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
