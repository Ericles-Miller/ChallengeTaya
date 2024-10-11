import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Req, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
  
  @ApiOperation({summary: 'Create a new customer with data in request'})
  @ApiProperty()
  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  create(@Body() createCustomerDto: CreateCustomerDto, @Req() req: Request) {
    const user = req.headers['user_id'];
    console.log(user);
    
    //return this.customersService.create(createCustomerDto, user);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
