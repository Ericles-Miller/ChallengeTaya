import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateProposalDto {
  @ApiProperty({
    minLength: 1,
    required: true,
    description: 'identifier customer',
    example: 132453, 
  })
  @IsNotEmpty()
  @IsNumber()
  @IsNotEmpty()
  customerId: number;


  @ApiProperty({
    minLength: 0.1,
    required: true,
    description: 'value credit to customer',
    example: 10000, 
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0.1, { message: 'Balance must be greater than or equal to 0.1' })
  profit: number;
}
