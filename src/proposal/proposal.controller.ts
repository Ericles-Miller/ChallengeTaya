import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Req } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { ApiHeader, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Proposal } from './entities/proposal.entity';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post() // ok
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  })
  @HttpCode(201)
  @ApiOperation({summary: 'Create a new proposal with data in request'})
  @ApiProperty()
  async create(@Body() createProposalDto: CreateProposalDto, @Req() req: Request) : Promise<Proposal>{
    const user = req.user;
    return await this.proposalService.create(createProposalDto, user);
  }

  @Get() // ok
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  })
  async findAll(@Req() req: Request) : Promise<Proposal[]> {
    const user = req.user;
    return this.proposalService.findAll(user);
  }

  @Get('refused') //ok
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  })
  async findAllRefused(@Req() req: Request): Promise<Proposal[]>{
    const user = req.user;
    return await this.proposalService.findAllRefused(user);
  }

  @Get(':id')
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  })
  async getProposalById( 
    @Param('id') proposalId: number, @Req() req: { user: User },
  ): Promise<Proposal> {
    const user = req.user;
    return await this.proposalService.findOne(proposalId, user);
  }
  

  @Patch(':id/approve') //ok
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  })
  async update(@Param('id') id: number, @Body() updateProposalDto: UpdateProposalDto) : Promise<Proposal> {
    return this.proposalService.update(+id, updateProposalDto);
  }
}
