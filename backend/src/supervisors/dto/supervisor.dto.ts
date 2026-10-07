import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

export class CreateSupervisorDto {
  @ApiProperty({ example: 'Suresh Babu' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: '8765432109' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[6-9]\d{9}$/, { message: 'Enter a valid 10-digit mobile number' })
  phone: string;

  @ApiProperty({ example: 'suresh@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Ambattur Industrial Estate, Chennai' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'secure123', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'clxyz123', description: 'Project ID the supervisor belongs to' })
  @IsString()
  @IsNotEmpty()
  projectId: string;
}

export class UpdateSupervisorDto extends PartialType(
  OmitType(CreateSupervisorDto, ['password', 'projectId'] as const),
) {}

export class SupervisorLoginDto {
  @ApiProperty({ example: '8765432109' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[6-9]\d{9}$/, { message: 'Enter a valid 10-digit mobile number' })
  phone: string;

  @ApiProperty({ example: 'secure123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
