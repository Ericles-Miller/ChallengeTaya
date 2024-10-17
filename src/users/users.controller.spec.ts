import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SumProfitResponseDTO } from './dto/SumProfit-user.dto';
import { ProposalStatus } from 'src/proposal/entities/proposal.entity';
import { User } from './entities/user.entity';
import { UserProfit } from './dto/userProfit-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const user : User = {
    balance: 500,
    createdAt: new Date(),
    name: 'John Doe',
    createdCustomers: [],
    id: 1,
    proposals: [],
    updatedAt: new Date(),
  };

  const userProfits: UserProfit[] = [ {
    name: 'John Doe',
    id: 1,
    totalProposal: 500,
  }];

  const sumProfits : SumProfitResponseDTO[] = [{
    name: 'John Doe',
    status: ProposalStatus.SUCCESSFUL,
    totalProfit: 500
  }]; 
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: {
          create: jest.fn().mockResolvedValue(user),
          sumProfitByStatus: jest.fn().mockResolvedValue(sumProfits),
          findBestUsers: jest.fn().mockResolvedValue(userProfits)

        }
      }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(UsersController).toBeDefined();
    expect(UsersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const body: CreateUserDto = {
        balance: 500,
        name: 'John Doe',
      };

      const result = await controller.create(body);

      expect(result).toEqual(user);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(body);
    });
  });

  describe('findAll', () => {
    it('should be able list all sum profit by status', async () => {
      const result = await controller.findAll();

      expect(result).toEqual(sumProfits);
      expect(service.sumProfitByStatus).toHaveBeenCalledTimes(1);
    });
  });

  describe('get best user', () => {
    it('should be able list all best users', async () => {
      const startAt = '2024-10-21';
      const endAt = '2024-11-22';

      const result = await service.findBestUsers(startAt, endAt);

      expect(result).toEqual(userProfits);
      expect(service.findBestUsers).toHaveBeenCalledTimes(1);
    });

    it('should be able expected error in dates', async () => {
      const startAt = '2024-10-21';
      const endAt = '2023-11-22';

      jest.spyOn(service, 'findBestUsers').mockRejectedValueOnce(() => {
       throw new BadRequestException('The endAt should be greater than startAt');
    });

      await expect(service.findBestUsers(startAt, endAt)).rejects.toThrow(BadRequestException);
      //await expect(service.findBestUsers(startAt, endAt)).rejects.toThrow('The endAt should be greater than startAt');
    });
  });


});
