import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Req } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post() // ok
  @HttpCode(201)
  @ApiOperation({summary: 'Create a new proposal with data in request'})
  @ApiProperty()
  create(@Body() createProposalDto: CreateProposalDto, @Req() req: Request) {
    const user = req.user;
    return this.proposalService.create(createProposalDto, user);
  }

  @Get() // ok
  findAll(@Req() req: Request) {
    const user = req.user;
    return this.proposalService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proposalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProposalDto: UpdateProposalDto) {
    return this.proposalService.update(+id, updateProposalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proposalService.remove(+id);
  }
}
