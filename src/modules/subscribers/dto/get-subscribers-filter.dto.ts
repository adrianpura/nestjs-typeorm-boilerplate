import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class GetSubscribersFilterDo {
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