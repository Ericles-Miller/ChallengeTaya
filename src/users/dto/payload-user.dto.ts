import { ApiProperty } from "@nestjs/swagger";

export class PayloadUserDTO {
  @ApiProperty( {
    minLength: 3,
    maxLength: 100,
    required: true,
    description: "user name",
    example: "John Doe",
  })
  name: string;

  @ApiProperty({
    minLength: 1,
    example: 125376,
    required: true,
  })
  id: number;
}