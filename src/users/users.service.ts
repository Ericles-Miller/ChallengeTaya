import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}


  async create({balance, name}: CreateUserDto) : Promise<User> {
    const user = new User(name, balance);
    return await this.repository.save(user);
  }

  async findAll() : Promise<User[]> {
    return await this.repository.find({
      relations: ["createdCustomers", "proposals"]
    });
  }

  async findOne(id: number) {
    return await this.repository.findOne({ 
      where: { id }, relations: ["createdCustomers", "proposals"]
     });
  }
}
