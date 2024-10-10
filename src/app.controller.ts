import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Proposal,  } from './entities/entities.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';
import { AuthService } from './auth/auth.service';
import { PayloadUserDTO } from './users/dto/payload-user.dto';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Proposal)
    private proposalRepository: Repository<Proposal>,
    private authService: AuthService,

  ) {}

  @Get('/proposals/:id')
  async getProposalById( 
    @Param('id') proposalId: number, @Req() req: { user: User },
  ): Promise<Proposal> {
    console.log(req);
    return await this.proposalRepository.findOne({ where: { id: proposalId } });
  }


  @ApiOperation({
    description: "login with user to browser between endpoints",
    summary: 'login user'
  })
  @ApiProperty()
  @Post('auth/login')
  async login(@Body() loginDto: PayloadUserDTO) {
    return await this.authService.login(loginDto);
  }
}
