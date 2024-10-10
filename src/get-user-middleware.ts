import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers['user_id'];
    if (!userId)
      throw new UnauthorizedException(); 
    
    const user = await this.userRepository.findOneBy({ id: Number(userId) });
    if (!user)
      throw new UnauthorizedException();
    
    
    (req as any).user = user;
    next();
  }
}
