import { IsNotEmpty } from 'class-validator';

export class CreateSubscriberDto {
  @IsNotEmpty()
  psid: string;

  @IsNotEmpty()
  brand_id: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;
}
