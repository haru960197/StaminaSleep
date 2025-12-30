import { IsDateString, IsInt, IsOptional, IsString, Max, Min, IsNumber } from 'class-validator';

export class CreateSleepLogDto {
  @IsDateString()
  bedtime: string;

  @IsDateString()
  wakeTime: string;

  @IsInt()
  @Min(1)
  @Max(5)
  quality: number;

  @IsInt()
  @Min(1)
  @Max(5)
  mood: number;

  @IsOptional()
  @IsString()
  memo?: string;

  @IsOptional()
  @IsNumber()
  temperature?: number;

  @IsOptional()
  @IsNumber()
  pressure?: number;

  @IsOptional()
  @IsString()
  weatherCondition?: string;
}
