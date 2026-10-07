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
import { SupervisorsService } from './supervisors.service';
import { CreateSupervisorDto, UpdateSupervisorDto } from './dto/supervisor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Supervisors')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('supervisors')
export class SupervisorsController {
  constructor(private readonly supervisorsService: SupervisorsService) {}

  // ── POST /api/supervisors ─────────────────────────────────────────────────
  // Owner creates a new supervisor for their project
  @Post()
  @ApiOperation({ summary: 'Register a new supervisor (Owner only)' })
  @ApiResponse({ status: 201, description: 'Supervisor created' })
  @ApiResponse({ status: 409, description: 'Phone or email already registered' })
  create(@Request() req, @Body() dto: CreateSupervisorDto) {
    return this.supervisorsService.create(req.user.id, dto);
  }

  // ── GET /api/supervisors/me ───────────────────────────────────────────────
  // Supervisor views their own profile
  @Get('me')
  @ApiOperation({ summary: 'Get own supervisor profile (Supervisor only)' })
  getMyProfile(@Request() req) {
    return this.supervisorsService.findById(req.user.id);
  }

  // ── GET /api/supervisors/project/:projectId ───────────────────────────────
  // Owner lists supervisors of a project
  @Get('project/:projectId')
  @ApiParam({ name: 'projectId', description: 'Project ID' })
  @ApiOperation({ summary: 'List all supervisors for a project (Owner only)' })
  findByProject(@Request() req, @Param('projectId') projectId: string) {
    return this.supervisorsService.findByProject(projectId, req.user.id);
  }

  // ── GET /api/supervisors/:id ──────────────────────────────────────────────
  @Get(':id')
  @ApiParam({ name: 'id', description: 'Supervisor ID' })
  @ApiOperation({ summary: 'Get a supervisor by ID' })
  findOne(@Param('id') id: string) {
    return this.supervisorsService.findById(id);
  }

  // ── PUT /api/supervisors/:id ──────────────────────────────────────────────
  @Put(':id')
  @ApiParam({ name: 'id', description: 'Supervisor ID' })
  @ApiOperation({ summary: 'Update supervisor details' })
  update(@Param('id') id: string, @Body() dto: UpdateSupervisorDto) {
    return this.supervisorsService.update(id, dto);
  }

  // ── DELETE /api/supervisors/:id ───────────────────────────────────────────
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', description: 'Supervisor ID' })
  @ApiOperation({ summary: 'Remove a supervisor (Owner only)' })
  remove(@Request() req, @Param('id') id: string) {
    return this.supervisorsService.remove(id, req.user.id);
  }
}
