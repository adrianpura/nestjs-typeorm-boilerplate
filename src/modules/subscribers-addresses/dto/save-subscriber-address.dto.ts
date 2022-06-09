import { IsNotEmpty } from 'class-validator';

export class SaveSubscriberAddressDto {
  @IsNotEmpty()
  subscriber_id: number;

  @IsNotEmpty()
  full_address: string;

  //   @IsNotEmpty()
  //   city: string;

  @IsNotEmpty()
  lon: string;

  @IsNotEmpty()
  lat: string;

  //   @IsNotEmpty()
  //   order_type: string;
}
