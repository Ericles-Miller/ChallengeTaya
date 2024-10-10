import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ){}

  async create({ cpf, name }: CreateCustomerDto, userCreator: User) {    
    const cpfAlreadyExists = await this.repository.findOne({ where: {cpf}});
    if(cpfAlreadyExists) 
      throw new Error('cpf already exists');

    const customer = new Customer(name, cpf, userCreator);
    return this.repository.save(customer);
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
