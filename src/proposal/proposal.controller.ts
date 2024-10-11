import { Controller, Get, Post, Body, Patch, Param, HttpCode, Req } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { ApiHeader, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Proposal } from './entities/proposal.entity';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post()
  @ApiOperation({summary: 'Create a new proposal with data in request'})
  @ApiResponse({
    status: 201,
    description: 'The proposal has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation errors or invalid data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbidden. User does not have permission to perform this action.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @ApiProperty() 
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  })
  @HttpCode(201)
  async create(@Body() createProposalDto: CreateProposalDto, @Req() req: Request) : Promise<Proposal>{
    const user = req.user;
    return await this.proposalService.create(createProposalDto, user);
  }

  @ApiOperation({summary: 'list all proposal with status PENDING by user'})
  @ApiResponse({
    status: 200,
    description: 'data proposals',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation errors or invalid data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbidden. User does not have permission to perform this action.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  }) 
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  })
  @Get()
  @HttpCode(200)
  async findAll(@Req() req: Request) : Promise<Proposal[]> {
    const user = req.user;
    return await this.proposalService.findAll(user);
  }


  @ApiOperation({summary: 'list all proposal with status REFUSED by user'})
  @ApiResponse({
    status: 200,
    description: 'data proposal',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbidden. User does not have permission to perform this action.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation errors or invalid data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  }) 
  @Get('refused') 
  @HttpCode(200)
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


  @ApiOperation({summary: 'list proposal belongs user'})
  @ApiResponse({
    status: 200,
    description: 'data proposal',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation errors or invalid data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbidden. User does not have permission to perform this action.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  })
  @Get(':id')
  @HttpCode(200)
  async getProposalById( 
    @Param('id') proposalId: number, @Req() req: { user: User },
  ): Promise<Proposal> {
    const user = req.user;
    return await this.proposalService.findOne(proposalId, user);
  }
  
  @ApiOperation({summary: 'update proposal'})
  @ApiResponse({
    status: 200,
    description: 'data proposal',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation errors or invalid data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Forbidden. User does not have permission to perform this action.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. Something went wrong on the server.',
  })
  @Patch(':id/approve') 
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  })
  @HttpCode(200)
  async update(@Param('id') id: number, @Body() updateProposalDto: UpdateProposalDto) : Promise<Proposal> {
    return await this.proposalService.update(+id, updateProposalDto);
  }
}
