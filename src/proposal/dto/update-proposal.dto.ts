import { IsEnum } from 'class-validator';
import { ProposalStatus } from '../entities/proposal.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProposalDto {
  @ApiProperty()
  @IsEnum(ProposalStatus, {
    message: 'Status must be a valid ProposalStatus value',
  })
  status: ProposalStatus;
}
