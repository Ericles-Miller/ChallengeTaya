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

  async signIn({ id, name }: PayloadUserDTO) : Promise<{ access_token: string }>{
      const user = await this.usersService.findOne(id);
      if(!user)
        throw new UnauthorizedException();
  
      if(user.name !== name)
        throw new UnauthorizedException(); 
  
      const payload = { username: user.name, sub: user.id };
      return { access_token: this.jwtService.sign(payload) };
  }
}
