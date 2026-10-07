import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class SendOtpDto {
  @ApiProperty({
    example: '9876543210',
    description: '10-digit Indian mobile number',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[6-9]\d{9}$/, { message: 'Enter a valid 10-digit mobile number' })
  phone: string;

  @ApiProperty({ enum: Role, example: Role.OWNER })
  @IsEnum(Role)
  role: Role;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '9876543210' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[6-9]\d{9}$/, { message: 'Enter a valid 10-digit mobile number' })
  phone: string;

  @ApiProperty({ enum: Role, example: Role.OWNER })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ example: '123456', description: '6-digit OTP code' })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
  @Matches(/^\d{6}$/, { message: 'OTP must contain only digits' })
  code: string;
}
