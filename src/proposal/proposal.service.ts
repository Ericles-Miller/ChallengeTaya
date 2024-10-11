import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { Repository } from 'typeorm';
import { Proposal, ProposalStatus } from './entities/proposal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { User } from 'src/users/entities/user.entity';

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
      where: {userCreator: {id: user.id}, customer: {id: customer.id}}
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

  async findOne(id: number, user: User): Promise<Proposal> {
    const proposal = await this.repository.findOne({where: { id}, relations: ['userCreator'] });
    if(!proposal)
      throw new BadRequestException('the proposalId does not exists');

    if(proposal.userCreator.id !== user.id)
      throw new UnauthorizedException('Access Denied');

    return proposal;
  }

  async update(id: number, updateProposalDto: UpdateProposalDto) : Promise<Proposal> {
    const proposal = await this.repository.findOne({ where: {id}, relations: ["customer", "userCreator"] });
    if(!proposal)
      throw new BadRequestException('Proposal id does not exists');

    if(!proposal.customer)
      throw new BadRequestException('customer does not exists');

    if(proposal.status !== ProposalStatus.PENDING)
      throw new BadRequestException(
        'Cannot update proposal with status different from PENDING'
      );
    
    if(updateProposalDto.status === ProposalStatus.SUCCESSFUL) {
      if(proposal.userCreator.balance < proposal.profit) {
        proposal.status = ProposalStatus.REFUSED;
        return await this.repository.save(proposal);
      }
    
      proposal.status = updateProposalDto.status;
      proposal.updatedAt = new Date();
      
      proposal.userCreator.balance-= proposal.profit;
      proposal.customer.balance += proposal.profit;
      proposal.customer.updatedAt = new Date();
    } else {
      proposal.status = updateProposalDto.status;
      proposal.updatedAt = new Date();
    }

    return await this.repository.save(proposal);
  }

  async findAllRefused(user: string | any) : Promise<Proposal[]>{
    
    const proposal = await this.repository.find({
      where: {userCreator: { id: user.id }, status: ProposalStatus.REFUSED},
    });
    
    return proposal;
  }
}
