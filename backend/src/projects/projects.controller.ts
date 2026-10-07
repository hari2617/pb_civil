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
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // ── POST /api/projects ────────────────────────────────────────────────────
  @Post()
  @ApiOperation({ summary: 'Create a new project for the authenticated owner' })
  @ApiResponse({ status: 201, description: 'Project created' })
  create(@Request() req, @Body() dto: CreateProjectDto) {
    return this.projectsService.create(req.user.id, dto);
  }

  // ── GET /api/projects ─────────────────────────────────────────────────────
  @Get()
  @ApiOperation({ summary: 'List all projects belonging to the owner' })
  findAll(@Request() req) {
    return this.projectsService.findAllByOwner(req.user.id);
  }

  // ── GET /api/projects/:id ─────────────────────────────────────────────────
  @Get(':id')
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiOperation({ summary: 'Get a single project with recent daily updates' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.projectsService.findOne(id, req.user.id);
  }

  // ── GET /api/projects/:id/dashboard ──────────────────────────────────────
  @Get(':id/dashboard')
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiOperation({ summary: 'Get dashboard summary stats for a project' })
  getDashboard(@Request() req, @Param('id') id: string) {
    return this.projectsService.getDashboard(id, req.user.id);
  }

  // ── PUT /api/projects/:id ─────────────────────────────────────────────────
  @Put(':id')
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiOperation({ summary: 'Update project details or progress percentage' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, req.user.id, dto);
  }

  // ── DELETE /api/projects/:id ──────────────────────────────────────────────
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiOperation({ summary: 'Delete a project and all related data' })
  remove(@Request() req, @Param('id') id: string) {
    return this.projectsService.remove(id, req.user.id);
  }
}
