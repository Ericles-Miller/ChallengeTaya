import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';
import { AuthService } from './auth/auth.service';
import { PayloadUserDTO } from './users/dto/payload-user.dto';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { Proposal } from './proposal/entities/proposal.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Proposal)
    private proposalRepository: Repository<Proposal>,
    //private authService: AuthService,

  ) {}
}
