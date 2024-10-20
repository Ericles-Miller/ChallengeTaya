import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { toZonedTime } from 'date-fns-tz';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SumProfitResponseDTO } from './dto/SumProfit-user.dto';
import { UserProfit } from './dto/userProfit-user.dto';
import { addDays, endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserDto): Promise<User> {
    const user = this.repository.create({
      name: createUserDTO.name,
      balance: createUserDTO.balance,
    });

    return await this.repository.save(user);
  }

  async sumProfitByStatus(): Promise<SumProfitResponseDTO[]> {
    const sumProfits: SumProfitResponseDTO[] = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.proposals', 'proposal')
      .select('user.name', 'name')
      .addSelect('proposal.status', 'status')
      .addSelect('SUM(proposal.profit)', 'totalProfit')
      .groupBy('user.name')
      .addGroupBy('proposal.status')
      .getRawMany();

    return sumProfits;
  }

  async findBestUsers(start: string, end: string): Promise<UserProfit[]> {
    const timeZone = 'America/Sao_Paulo';
    const startAt = toZonedTime(startOfDay(new Date(start)), timeZone);
    const endAt = toZonedTime(endOfDay(new Date(end)), timeZone);

    if (startAt > endAt)
      throw new BadRequestException('The endAt should be able biggest startAt');

    const totalProposals = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.proposals', 'proposal')
      .select('user.id', 'id')
      .addSelect('user.name', 'name')
      .addSelect('SUM(proposal.profit)', 'totalProposal')
      .where('proposal.status = :status', { status: 'SUCCESSFUL' })
      .andWhere('proposal.createdAt BETWEEN :start AND :end', {
        start: addDays(startAt, 1),
        end: addDays(endAt, 1),
      })
      .groupBy('user.id')
      .orderBy('totalProposal', 'DESC')
      .getRawMany();

    return totalProposals;
  }
}
