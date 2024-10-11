import { Controller, Get, Post, Body, Param, HttpCode, UseGuards, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserProfit } from './dto/userProfit-user.dto';

@ApiTags('Admin')
@Controller('admin')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Create a new user with data in request' })
  @ApiProperty()
  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get(':id/profit-by-status')
  findAll(@Param('id') id: number) {
    return this.usersService.sumProfitByStatus(id);
  }

  @ApiOperation({ summary: 'find best users' })
  @ApiProperty()
  @Get('best-users')
    async getBestUsers( 
      @Query('id') id: number,
      @Query('start') start: string, @Query('end') end: string
    ): Promise<UserProfit[]> {
      return this.usersService.findBestUsers(Number(id), start, end);
    }
}
