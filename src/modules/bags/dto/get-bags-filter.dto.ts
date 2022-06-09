import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetBagsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  subscriber_id: number;

  @IsOptional()
  @IsNotEmpty()
  limit: number;

  @IsOptional()
  @IsNotEmpty()
  page: number;
}
