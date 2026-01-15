import {
  IsString,
  IsNumber,
  IsDateString,
  IsNotEmpty,
  Min,
  Max,
  IsInt,
} from 'class-validator';

export class CreateTimeEntryDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsInt()
  @Min(1)
  projectId: number;

  @IsNumber()
  @Min(0.25)
  @Max(24)
  @IsNotEmpty()
  hours: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
