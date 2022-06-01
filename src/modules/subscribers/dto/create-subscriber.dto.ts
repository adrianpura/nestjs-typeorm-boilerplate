import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSubscriberDto {
  @IsNotEmpty()
  psid: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsOptional()
  @IsNotEmpty()
  avatar: string;
}
