import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';
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
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @ApiProperty({
    description: 'CPF customers',
    example: '000.000.000.00',
    minLength: 11,
    maxLength: 14,
    required: true,  
  })
  @IsCPF({message: 'Invalid CPF'})
  @IsString()
  cpf: string;

  @ApiProperty({
    description: 'amount balance client',
    example: 5000,
    minLength: 0.1,
    required: true,  
  })
  @IsNumber()
  @Min(0.1, { message: 'Balance must be greater than or equal to 0.1' })
  balance: number;
}
