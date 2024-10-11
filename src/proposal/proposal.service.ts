import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { Repository } from 'typeorm';
import { Proposal, ProposalStatus } from './entities/proposal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class ProposalService {

  constructor(
    @InjectRepository(Proposal)
    private readonly repository: Repository<Proposal>,
    
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}

  async  create({customerId, profit}: CreateProposalDto, user: string| any) : Promise<Proposal> {
    const customer = await this.customerRepository.findOne({where: {id: customerId}});
    if(!customer)
      throw new BadRequestException('The customerId does not exits');

    let proposal = await this.repository.findOne({
      where: {userCreator: user, customer: customer}
    });

    if(proposal)
      throw new BadRequestException('The customer already has proposal');

    proposal = new Proposal(profit, customer, user);
    
    return await this.repository.save(proposal);
  }

  async findAll(userCreator: string| any) : Promise<Proposal[]> {
    const proposal = await this.repository.find({
      where: {
        userCreator : { id: userCreator.id },
         status: ProposalStatus.PENDING 
      }
    });

    return proposal;
  }

  findOne(id: number) {
    return `This action returns a #${id} proposal`;
  }

  async update(id: number, updateProposalDto: UpdateProposalDto) : Promise<void> {
    const proposal = await this.repository.findOne({
      where: {id}
    });

    if(!proposal)
      throw new BadRequestException('Proposal id does not exists');

    const customer = await this.customerRepository.findOne({
      where: {id: updateProposalDto.customerId}
    });

    if(!customer)
      throw new BadRequestException('customerId does not exists');

    if(proposal.status !== ProposalStatus.PENDING)
      throw new BadRequestException(
        'does not possible update proposal with status different PENDING'
      );
    
    if(updateProposalDto.status === ProposalStatus.SUCCESSFUL) {
      proposal.status = updateProposalDto.status;
      proposal.updatedAt = new Date();
      customer.balance += updateProposalDto.profit;
      customer.updatedAt = new Date()
    } else {
      proposal.status = updateProposalDto.status;
      proposal.updatedAt = new Date();
    }

    const updateCustomer = await this.customerRepository.save(customer);
    const updateProposal = await this.repository.save(proposal);
  }

  remove(id: number) {
    return `This action removes a #${id} proposal`;
  }
}
