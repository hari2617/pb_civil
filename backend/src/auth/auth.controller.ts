import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SendOtpDto, VerifyOtpDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ── POST /api/auth/send-otp ───────────────────────────────────────────────
  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Send OTP to phone',
    description:
      'Generates a 6-digit OTP and sends it via SMS. In development mode the OTP is also returned in the response.',
  })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid phone number' })
  sendOtp(@Body() dto: SendOtpDto) {
    return this.authService.sendOtp(dto);
  }

  // ── POST /api/auth/verify-otp ─────────────────────────────────────────────
  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verify OTP and receive JWT',
    description:
      'Verifies the OTP code. On success returns a JWT access token. ' +
      '`isNewUser: true` means the owner profile needs to be completed.',
  })
  @ApiResponse({
    status: 200,
    description: 'OTP verified; JWT token returned',
    schema: {
      example: {
        accessToken: 'eyJhbGci...',
        isNewUser: true,
        role: 'OWNER',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid or expired OTP' })
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }
}
