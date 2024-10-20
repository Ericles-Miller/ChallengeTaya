import { validate } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

describe('create-customer DTO class', () => {
  let dto: CreateCustomerDto;

  beforeEach(() => {
    dto = new CreateCustomerDto();
  });

  it('should validate a valid dto customer', async () => {
    dto.balance = 500;
    dto.cpf = '311.806.380-77';
    dto.name = 'John Doe';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should throw an error if name is too long', async () => {
    dto.name = 'a'.repeat(101);
    dto.balance = 5000;
    dto.cpf = '311806.380-77';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.maxLength).toEqual(
      'Name must not exceed 100 characters',
    );
  });

  it('should throw an error if balance is less than 0.1', async () => {
    dto.name = 'John Doe';
    dto.balance = 0.05;
    dto.cpf = '311806.380-77';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.min).toEqual(
      'Balance must be greater than or equal to 0.1',
    );
  });

  it('should throw an error if cpf is invalid', async () => {
    dto.name = 'John Doe';
    dto.balance = 500;
    dto.cpf = '311806.180-70';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe('CreateCustomerDto', () => {
  test.each([
    [
      '',
      '311.806.380-77',
      100,
      ['Name must be at least 3 characters long, name should not be empty'],
    ],
    ['Jo', '311.806.380-77', 100, ['Name must be at least 3 characters long']],
    ['John Doe', '', 100, ['Invalid CPF']],
    ['John Doe', '000.000.000-00', 100, ['Invalid CPF']],
    [
      'John Doe',
      '311.806.380-77',
      -50,
      ['Balance must be greater than or equal to 0.1'],
    ],
    [
      'John Doe',
      '311.806.380-77',
      0,
      ['Balance must be greater than or equal to 0.1'],
    ],
  ])(
    'should return validation errors for invalid name, cpf, or balance',
    async (
      name: string,
      cpf: string,
      balance: number,
      expectedErrors: string[],
    ) => {
      const createCustomerDto = new CreateCustomerDto();
      createCustomerDto.name = name;
      createCustomerDto.cpf = cpf;
      createCustomerDto.balance = balance;

      const errors = await validate(createCustomerDto);

      const errorMessages = errors.map((err) =>
        Object.values(err.constraints).join(', '),
      );
      expectedErrors.forEach((expectedError) => {
        expect(errorMessages).toContain(expectedError);
      });
    },
  );

  test('should pass validation for valid properties', async () => {
    const createCustomerDto = new CreateCustomerDto();
    createCustomerDto.name = 'John Doe';
    createCustomerDto.cpf = '123.321.123-98';
    createCustomerDto.balance = 1000;

    const errors = await validate(createCustomerDto);

    expect(errors.length).toBe(1);
  });
});
