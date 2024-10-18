import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProposalStatus } from 'src/proposal/entities/proposal.entity';
import { SumProfitResponseDTO } from './dto/SumProfit-user.dto';
import { UserProfit } from './dto/userProfit-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

const user: User = {
  balance: 500,
  createdAt: new Date(),
  name: 'John Doe',
  createdCustomers: [],
  id: 1,
  proposals: [],
  updatedAt: new Date(),
};

const userProfits: UserProfit[] = [{
  name: 'John Doe',
  id: 1,
  totalProposal: 500,
}];

const sumProfits: SumProfitResponseDTO[] = [{
  name: 'John Doe',
  status: ProposalStatus.SUCCESSFUL,
  totalProfit: 500
}];

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let createQueryBuilderMock: any;

  beforeEach(async () => {
    createQueryBuilderMock = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValueOnce(userProfits),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue(createQueryBuilderMock), // Certificando que createQueryBuilder retorne o mock
            create: jest.fn().mockResolvedValue(user),
            save: jest.fn().mockReturnValue(user),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const data: CreateUserDto = {
        name: 'John Doe',
        balance: 500,
      };

      const result = await service.create(data);

      expect(result).toEqual(user);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findBestUsers', () => {
    it('should be able to list all best users successfully', async () => {
      const result = await service.findBestUsers('2024-01-01', '2024-12-01');

      expect(result).toEqual(userProfits);
      expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(createQueryBuilderMock.leftJoinAndSelect).toHaveBeenCalledWith('user.proposals', 'proposal');
      expect(createQueryBuilderMock.getRawMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('sumProfitByStatus', () => {
    
  })
});
