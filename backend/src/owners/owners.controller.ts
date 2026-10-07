import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OwnersService } from './owners.service';
import { CreateOwnerDto, UpdateOwnerDto } from './dto/owner.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Owners')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  // ── GET /api/owners/me ────────────────────────────────────────────────────
  @Get('me')
  @ApiOperation({ summary: 'Get own owner profile with all projects' })
  @ApiResponse({ status: 200, description: 'Owner profile returned' })
  getProfile(@Request() req) {
    return this.ownersService.findById(req.user.id);
  }

  // ── PUT /api/owners/me ────────────────────────────────────────────────────
  @Put('me')
  @ApiOperation({
    summary: 'Complete / update owner profile',
    description:
      'Called after OTP verification to complete registration. ' +
      'Subsequent calls update the profile.',
  })
  @ApiResponse({ status: 200, description: 'Profile updated' })
  upsertProfile(@Request() req, @Body() dto: CreateOwnerDto) {
    return this.ownersService.upsertProfile(req.user.id, dto);
  }
}
