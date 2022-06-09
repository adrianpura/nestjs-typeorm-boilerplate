import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBagDto {
  @IsNotEmpty()
  brand_id: number;

  @IsNotEmpty()
  store_id: number;

  @IsNotEmpty()
  subscriber_id: number;

  @IsNotEmpty()
  @IsOptional()
  order_type: string;

  @IsNotEmpty()
  @IsOptional()
  order_time: Date;

  @IsNotEmpty()
  @IsOptional()
  order_time_schedule: string;
}
