import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { ProjectType } from '@prisma/client';

export class CreateProjectDto {
  @ApiProperty({ example: 'Kumar Residence Phase 1' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({ enum: ProjectType, example: ProjectType.RESIDENTIAL })
  @IsEnum(ProjectType)
  type: ProjectType;

  @ApiProperty({ example: 'No 12, Anna Nagar, Chennai - 600040' })
  @IsString()
  @IsNotEmpty()
  siteAddress: string;

  @ApiPropertyOptional({ example: 13.0827 })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({ example: 80.2707 })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiPropertyOptional({ example: 2500000, description: 'Budget in INR' })
  @IsNumber()
  @IsOptional()
  @Min(0)
  budget?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  numberOfFloors?: number;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiPropertyOptional({ example: 45, description: 'Completion percentage 0–100' })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  progress?: number;
}
