import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { WorkerCategory, MaterialName, MaterialUnit, UrgencyLevel } from '@prisma/client';

export class WorkerEntryDto {
  @ApiProperty({ enum: WorkerCategory })
  @IsEnum(WorkerCategory)
  category: WorkerCategory;

  @ApiProperty({ description: 'Number of workers for this category' })
  @IsNumber()
  @Min(0)
  headcount: number;

  @ApiProperty({ description: 'Daily wage per worker (INR)' })
  @IsNumber()
  @Min(0)
  dailyWage: number;
}

export class MaterialRequestDto {
  @ApiProperty({ enum: MaterialName })
  @IsEnum(MaterialName)
  material: MaterialName;

  @ApiProperty({ description: 'Requested quantity' })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({ enum: MaterialUnit })
  @IsEnum(MaterialUnit)
  unit: MaterialUnit;

  @ApiPropertyOptional({ enum: UrgencyLevel, description: 'Urgency of request' })
  @IsEnum(UrgencyLevel)
  @IsOptional()
  urgencyLevel?: UrgencyLevel;

  @ApiProperty({ description: 'Date by which material is required' })
  @IsString()
  @IsNotEmpty()
  requiredByDate: string; // ISO date string
}

export class DailyUpdateCreateDto {
  @ApiProperty({ description: 'Optional notes for the day' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ type: [WorkerEntryDto] })
  @IsNotEmpty()
  workerEntries: WorkerEntryDto[];

  @ApiProperty({ type: [MaterialRequestDto] })
  @IsNotEmpty()
  materialRequests: MaterialRequestDto[];
}

export class DailyUpdateUpdateDto extends PartialType(DailyUpdateCreateDto) {}
