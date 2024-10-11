import { PartialType } from '@nestjs/swagger';
import { CreateProposalDto } from './create-proposal.dto';
import { ProposalStatus } from '../entities/proposal.entity';

export class UpdateProposalDto extends PartialType(CreateProposalDto) {
  status: ProposalStatus;
  
}
