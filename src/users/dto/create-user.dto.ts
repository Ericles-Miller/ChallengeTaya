import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 100,
    required: true,
    description: 'user name',
    example: "John Doe", 
  })
  name : string;

  @ApiProperty({
    description: 'amount balance user',
    example: 5000,
    minLength: 0.1,
    required: true,  
  })
  balance: number;
}
