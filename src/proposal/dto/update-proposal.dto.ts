import { IsEnum } from 'class-validator';
import { ProposalStatus } from '../entities/proposal.entity';

export class UpdateProposalDto {
  @IsEnum(
    ProposalStatus,
    { message: 'Status must be a valid ProposalStatus value' }
  )
  status: ProposalStatus;
}
