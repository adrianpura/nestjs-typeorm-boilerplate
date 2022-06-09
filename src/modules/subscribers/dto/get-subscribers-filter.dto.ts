import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetSubscribersFilterDto {
  @IsOptional()
  @IsNotEmpty()
  gender: string;

  @IsOptional()
  @IsNotEmpty()
  limit: number;

  @IsOptional()
  @IsNotEmpty()
  page: number;
}
