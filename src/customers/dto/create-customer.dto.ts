import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
import { IsCPF } from "src/configs/Validators/isValidCPF";

export class CreateCustomerDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 100,
    required: true,
    description: 'user name',
    example: "John Doe", 
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'CPF customers',
    example: '000.000.000.00',
    minLength: 11,
    maxLength: 14,
    required: true,  
  })
  @IsCPF({message: 'Invalid CPF'})
  cpf: string;

  @ApiProperty({
    description: 'amount balance client',
    example: 5000,
    minLength: 0.1,
    required: true,  
  })
  balance: number;
}
