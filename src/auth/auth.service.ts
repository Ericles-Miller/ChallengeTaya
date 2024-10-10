import { Dependencies, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService) {}

  async validateUser(userId: number) {
    const user = await this.usersService.findOne(userId);
    if(!user)
      throw new UnauthorizedException();

    return user;
  }
}
