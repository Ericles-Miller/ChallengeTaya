import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SumProfitResponseDTO } from './dto/SumProfit-user.dto';
import { ProposalStatus } from 'src/proposal/entities/proposal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).useMocker((token) => {
      const result : SumProfitResponseDTO[] = [{
        name: 'John Doe',
        status: ProposalStatus.SUCCESSFUL,
        totalProfit: 500
      }]; 
      
      if(token === UsersService)
        return {sumProfitByStatus: jest.fn().mockReturnValue(result)};
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('find best users', () => {
    it('it should return all best users', async () => {
      

      jest.spyOn(service, 'sumProfitByStatus').mockImplementation(() => Promise.resolve(result));

      expect(await controller.findAll(1)).toBe(result);
    })
  })
});
