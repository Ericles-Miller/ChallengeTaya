import { Controller, Get, Post, Body, Param, HttpCode,Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserProfit } from './dto/userProfit-user.dto';
import { User } from './entities/user.entity';
import { SumProfitResponseDTO } from './dto/SumProfit-user.dto';

@ApiTags('Admin')
@Controller('admin')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Create a new user with data in request' })
  @ApiProperty()
  @ApiResponse({
    status: 201,
    description: 'user created with success',
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
  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) : Promise<User> {
    return await this.usersService.create(createUserDto);
  }



  @ApiOperation({summary: 'list profit by status to user'})
  @ApiResponse({
    status: 200,
    description: 'list profit data',
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
  @Get(':id/profit-by-status')
  @HttpCode(200)
  async findAll(): Promise<SumProfitResponseDTO[]> {
    return await this.usersService.sumProfitByStatus();
  }

  @ApiOperation({ summary: 'find best users' })
  @ApiProperty()
  @ApiResponse({
    status: 200,
    description: 'list best user',
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
  @Get('best-users')
  @HttpCode(200)
    async getBestUsers( 
      @Query('start') startAt: string, @Query('end') endAt: string
    ): Promise<UserProfit[]> {
      return await this.usersService.findBestUsers(startAt, endAt);
    }
}
