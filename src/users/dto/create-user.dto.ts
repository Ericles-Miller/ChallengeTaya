import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNumber, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 100,
    required: true,
    description: 'user name',
    example: "John Doe", 
  })
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @ApiProperty({
    description: 'amount balance user',
    example: 5000,
    required: true,  
  })
  @IsNumber()
  @Min(0.1, { message: 'Balance must be greater than or equal to 0.1' })
  balance: number;
}
