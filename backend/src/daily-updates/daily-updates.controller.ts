import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DailyUpdatesService } from './daily-updates.service';
import { DailyUpdateCreateDto, DailyUpdateUpdateDto } from './dto/daily-update.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('DailyUpdates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('daily-updates')
export class DailyUpdatesController {
  constructor(private readonly dailyUpdatesService: DailyUpdatesService) {}

  // ── Supervisor creates a daily update ───────────────────────────────────────
  @Post('my')
  @ApiOperation({ summary: 'Supervisor creates a daily update for their project' })
  @ApiResponse({ status: 201, description: 'Daily update created' })
  create(@Request() req, @Body() dto: DailyUpdateCreateDto) {
    // req.user.id will be supervisor id because JWT token contains sub (id) and role
    return this.dailyUpdatesService.create(req.user.id, dto);
  }

  // ── Owner fetches updates for a project ───────────────────────────────────
  @Get('project/:projectId')
  @ApiParam({ name: 'projectId', description: 'Project ID' })
  @ApiOperation({ summary: 'Owner retrieves all daily updates for a project' })
  getByProject(@Request() req, @Param('projectId') projectId: string) {
    return this.dailyUpdatesService.getByProject(projectId, req.user.id);
  }

  // ── Supervisor fetches own updates ───────────────────────────────────────
  @Get('my')
  @ApiOperation({ summary: 'Supervisor fetches their own daily updates' })
  getMyUpdates(@Request() req) {
    return this.dailyUpdatesService.getBySupervisor(req.user.id);
  }

  // ── Owner updates a daily update (e.g., correct mistakes) ───────────────────
  @Put(':id')
  @ApiParam({ name: 'id', description: 'Daily update ID' })
  @ApiOperation({ summary: 'Owner updates a daily update record' })
  update(@Param('id') id: string, @Request() req, @Body() dto: DailyUpdateUpdateDto) {
    return this.dailyUpdatesService.update(id, req.user.id, dto);
  }

  // ── Owner deletes a daily update ────────────────────────────────────────
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', description: 'Daily update ID' })
  @ApiOperation({ summary: 'Owner deletes a daily update' })
  remove(@Param('id') id: string, @Request() req) {
    return this.dailyUpdatesService.remove(id, req.user.id);
  }
}
