import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
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
    const cpfAlreadyExists = await this.repository.findOne({ where: {cpf }});
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
    return await this.repository.findOne({where: {id},
      relations: ["userCreator", "proposals"]
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
