import { Controller, Get, Post, Body, Param, HttpCode, Req } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiHeader, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Customer } from './entities/customer.entity';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
   
  @ApiOperation({summary: 'Create a new customer with data in request'})
  @ApiResponse({
    status: 201,
    description: 'The customer has been successfully created.',
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
  @Post()
  @ApiHeader({
    name: 'user_id',
    description: 'payload user',
    required: true,
    example: '1'
  })
  @HttpCode(201)
  async create(@Body() createCustomerDto: CreateCustomerDto, @Req() req: Request) : Promise<Customer> {
    const user = req.user;
    return await this.customersService.create(createCustomerDto, user);
  }



  @ApiOperation({summary: 'list all customers'})
  @Get()
  @ApiResponse({
    status: 200,
    description: 'list of all customers',
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
  @HttpCode(200)
  async findAll() : Promise<Customer[]>{
    return await this.customersService.findAll();
  }


  @ApiOperation({summary: 'list customers by identifier'})
  @ApiOperation({summary: 'list all customers'})
  @ApiResponse({
    status: 200,
    description: 'data customer',
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
  @HttpCode(201)
  async findOne(@Param('id') id: string) : Promise<Customer> {
    return await this.customersService.findOne(+id);
  }
}
