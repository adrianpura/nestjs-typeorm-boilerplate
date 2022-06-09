import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class UpdateSubscriberDto {
  @IsNotEmpty()
  psid: string;

  @IsOptional()
  @IsNotEmpty()
  gender: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,
    { message: 'email format is invalid ' },
  )
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, {
    message: 'birthday format is invalid',
  })
  birthday: Date;

  @IsOptional()
  @IsNotEmpty()
  mobile_number: number;
}
