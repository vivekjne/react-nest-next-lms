import { IsNotEmpty, Length, Max, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(30)
  readonly userName: string;

  @IsNotEmpty()
  @MaxLength(50)
  readonly firstName: string;

  @IsNotEmpty()
  @MaxLength(50)
  readonly lastName: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @MaxLength(100)
  readonly email: string;

  @IsNotEmpty()
  readonly active: boolean;
}
