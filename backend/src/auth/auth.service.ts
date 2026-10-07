import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role, OtpStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SendOtpDto, VerifyOtpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // ── Send OTP via Twilio Verify ───────────────────────────────────────────
  async sendOtp(dto: SendOtpDto): Promise<{ message: string }> {
    const { phone } = dto;
    const sid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const token = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    const verifySid = this.configService.get<string>('TWILIO_VERIFY_SERVICE_SID');

    if (!sid || sid === 'your_twilio_account_sid' || !verifySid) {
      throw new BadRequestException('Twilio Verify is not configured properly.');
    }

    try {
      const twilio = require('twilio');
      const client = twilio(sid, token);
      await client.verify.v2.services(verifySid).verifications.create({
        to: `+91${phone}`,
        channel: 'sms',
      });
      return { message: `OTP sent to ${phone} via Twilio Verify.` };
    } catch (err) {
      console.error('Twilio Verify Send error:', err?.message ?? err);
      throw new BadRequestException('Failed to send OTP.');
    }
  }

  // ── Verify OTP & return JWT ───────────────────────────────────────────────
  async verifyOtp(
    dto: VerifyOtpDto,
  ): Promise<{ accessToken: string; isNewUser: boolean; role: Role }> {
    const { phone, role, code } = dto;
    const sid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const token = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    const verifySid = this.configService.get<string>('TWILIO_VERIFY_SERVICE_SID');

    if (!sid || sid === 'your_twilio_account_sid' || !verifySid) {
      throw new BadRequestException('Twilio Verify is not configured properly.');
    }

    try {
      const twilio = require('twilio');
      const client = twilio(sid, token);
      const verificationCheck = await client.verify.v2.services(verifySid).verificationChecks.create({
        to: `+91${phone}`,
        code: code,
      });

      if (verificationCheck.status !== 'approved') {
        throw new UnauthorizedException('Invalid OTP. Please try again.');
      }
    } catch (err) {
      console.error('Twilio Verify Check error:', err?.message ?? err);
      throw new UnauthorizedException('Invalid OTP or expired.');
    }

    // ── Determine if this is an existing user ────────────────────────────
    let userId: string;
    let isNewUser = false;

    if (role === Role.OWNER) {
      const owner = await this.prisma.owner.findUnique({ where: { phone } });
      if (owner) {
        userId = owner.id;
      } else {
        // Create a placeholder owner so JWT subject is valid
        const newOwner = await this.prisma.owner.create({
          data: { phone, fullName: '' },
        });
        userId = newOwner.id;
        isNewUser = true;
      }
    } else {
      // SUPERVISOR
      const supervisor = await this.prisma.supervisor.findUnique({ where: { phone } });
      if (!supervisor) {
        throw new UnauthorizedException(
          'No supervisor account found for this phone number. Please contact your project owner.',
        );
      }
      userId = supervisor.id;
    }

    const payload = { sub: userId, phone, role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, isNewUser, role };
  }


}
