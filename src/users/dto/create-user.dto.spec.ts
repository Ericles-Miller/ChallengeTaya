import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('create-user DTO class', () => {
  let dto: CreateUserDto;

  beforeEach(() => {
    dto = new CreateUserDto();
  });

  it('should validate a valid dto user', async () => {
    dto.name = 'John Doe';
    dto.balance = 5000;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should throw an error if the name is too long', async () => {
    dto.name = 'a'.repeat(101);
    dto.balance = 5000;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.maxLength).toEqual(
      'Name must not exceed 100 characters',
    );
  });

  it('should throw an error if balance is less than 0.1', async () => {
    dto.name = 'John Doe';
    dto.balance = 0.05;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.min).toEqual(
      'Balance must be greater than or equal to 0.1',
    );
  });

  it('should throw an error if balance is not a number', async () => {
    dto.name = 'John Doe';
    dto.balance = 'invalid_balance' as any;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isNumber).toEqual(
      'balance must be a number conforming to the specified constraints',
    );
  });
});
