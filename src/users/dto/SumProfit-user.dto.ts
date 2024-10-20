import { ProposalStatus } from 'src/proposal/entities/proposal.entity';

export class SumProfitResponseDTO {
  name: string;
  status: ProposalStatus;
  totalProfit: number;
}
