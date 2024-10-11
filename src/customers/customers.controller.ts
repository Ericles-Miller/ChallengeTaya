import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Req, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiHeader, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
 
  
  @ApiOperation({summary: 'Create a new customer with data in request'})
  @ApiProperty()
  @Post()
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  })
  @HttpCode(201)
  create(@Body() createCustomerDto: CreateCustomerDto, @Req() req: Request) {
    const user = req.user;
    return this.customersService.create(createCustomerDto, user);
  }

  @Get()
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  })
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }
}
