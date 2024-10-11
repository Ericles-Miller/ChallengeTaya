import { ProposalStatus } from "src/proposal/entities/proposal.entity"

export class SumProfitDTO {
  name: string;
  status: ProposalStatus;
  totalProfit: number;
}