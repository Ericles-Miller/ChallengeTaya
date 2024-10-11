import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProposalDto {
  @ApiProperty({
    minLength: 1,
    required: true,
    description: 'identifier customer',
    example: 132453, 
  })
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({
    minLength: 0.1,
    required: true,
    description: 'value credit to customer',
    example: 10000, 
  })
  @IsNotEmpty()
  profit: number;
}
