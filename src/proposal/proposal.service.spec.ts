// import { Test, TestingModule } from '@nestjs/testing';
// import { ProposalService } from './proposal.service';
// import { Repository } from 'typeorm';
// import { Proposal } from './entities/proposal.entity';
// import { Customer } from 'src/customers/entities/customer.entity';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { BadRequestException } from '@nestjs/common';
// import { User } from 'src/users/entities/user.entity';

// describe('ProposalService', () => {
//   let service: ProposalService;
//   let proposalRepository: Repository<Proposal>;
//   let customerRepository: Repository<Customer>;

//   const mockProposalRepository = {
//     findOne: jest.fn(),
//     save: jest.fn(),
//   };

//   const mockCustomerRepository = {
//     findOne: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ProposalService,
//         {
//           provide: getRepositoryToken(Proposal),
//           useValue: mockProposalRepository,
//         },
//         {
//           provide: getRepositoryToken(Customer),
//           useValue: mockCustomerRepository,
//         },
//       ],
//     }).compile();

//     service = module.get<ProposalService>(ProposalService);
//     proposalRepository = module.get<Repository<Proposal>>(getRepositoryToken(Proposal));
//     customerRepository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('create', () => {
//     it('deve criar uma nova proposta quando o cliente existir', async () => {
//       const customer = { id: 1, name: 'John Doe' }; 
//       const user = { id: 1 }; 
//       const createProposalDto = { customerId: customer.id, profit: 100 };
  
//       mockCustomerRepository.findOne.mockResolvedValue(customer);
//       mockProposalRepository.findOne.mockResolvedValue(null);
  
//       const result = await service.create(createProposalDto, user);
  
//       expect(result).toBeInstanceOf(Proposal);
//       expect(mockProposalRepository.save).toHaveBeenCalledWith(expect.any(Proposal));
//     });
  
//     it('deve lançar uma exceção se o customerId não existir', async () => {
//       const createProposalDto = { customerId: 999, profit: 100 }; 
//       const user = { id: 1 };
  
//       mockCustomerRepository.findOne.mockResolvedValue(null);
  
//       await expect(service.create(createProposalDto, user)).rejects.toThrow(BadRequestException);
//     });
  
//     it('deve lançar uma exceção se já existir uma proposta para o cliente', async () => {
//       const customer: Customer = {  
//         name: "John Doe",
//         cpf: "13098812605",
//         balance: 15000,
//         id: 1,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         userCreator: null,
//         proposals: null,
//       };


//       const user: User = {id: 697,
//       name: "Arnaldo",
//       balance: 4800,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       createdCustomers: [],
//       proposals: []
//     }
//       const createProposalDto = { customerId: customer.id, profit: 100 };
//       const existingProposal = new Proposal(createProposalDto.profit, customer, user); 
  
//       mockCustomerRepository.findOne.mockResolvedValue(customer);
//       mockProposalRepository.findOne.mockResolvedValue(existingProposal); 
  
//       await expect(service.create(createProposalDto, user)).rejects.toThrow(BadRequestException);
//     });
//   });
// });
