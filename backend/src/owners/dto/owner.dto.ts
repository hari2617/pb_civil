import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateOwnerDto {
  @ApiProperty({ example: 'Ramesh Kumar', description: 'Full name of the owner' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  fullName: string;

  @ApiPropertyOptional({ example: 'ramesh@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'Kumar Constructions Pvt Ltd' })
  @IsString()
  @IsOptional()
  companyName?: string;
}

export class UpdateOwnerDto extends PartialType(CreateOwnerDto) {}
