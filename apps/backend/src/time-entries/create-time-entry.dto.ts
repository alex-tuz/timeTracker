import {
  IsString,
  IsNumber,
  IsDateString,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';

export class CreateTimeEntryDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  project: string;

  @IsNumber()
  @Min(0.25)
  @Max(24)
  @IsNotEmpty()
  hours: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
