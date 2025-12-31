import { IsDateString, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateSleepLogDto {
  @IsOptional()
  @IsDateString()
  bedtime?: string;

  @IsOptional()
  @IsDateString()
  wakeTime?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  quality?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  vitality?: number;

  @IsOptional()
  @IsString()
  memo?: string;
}
