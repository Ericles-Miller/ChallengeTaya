import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ){}

  async create({ cpf, name, balance }: CreateCustomerDto, userCreator: string | any): Promise<Customer> {        
    const cpfAlreadyExists = await this.repository.findOne({ where: { cpf }});
    if(cpfAlreadyExists) 
      throw new BadRequestException('CPF already exists');

    const customer = new Customer(name, cpf, balance);
    customer.userCreator = userCreator;

    return this.repository.save(customer);
  }

  async findAll() : Promise<Customer[]> {
    return await this.repository.find({
      relations: ["userCreator", "proposals"]
    });
  }

  async findOne(id: number) : Promise<Customer> {
    const customer =  await this.repository.findOne({where: {id},
      relations: ["userCreator", "proposals"]
    });

    if(!customer)
      throw new BadRequestException('The customerId does not exists');

    return customer;
  }
}
