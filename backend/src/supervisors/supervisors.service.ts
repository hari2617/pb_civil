import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateSupervisorDto,
  UpdateSupervisorDto,
} from './dto/supervisor.dto';

const SALT_ROUNDS = 12;

@Injectable()
export class SupervisorsService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Generate a unique supervisor ID like SUP-784321 ────────────────────────
  private generateSupervisorId(): string {
    const last6 = Date.now().toString().slice(-6);
    return `SUP-${last6}`;
  }

  // ── Create supervisor (owner only) ────────────────────────────────────────
  async create(ownerId: string, dto: CreateSupervisorDto) {
    // Verify project belongs to the owner
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });
    if (!project) throw new NotFoundException('Project not found');
    if (project.ownerId !== ownerId)
      throw new ForbiddenException('Cannot add supervisor to another owner\'s project');

    // Check uniqueness
    const existingPhone = await this.prisma.supervisor.findUnique({
      where: { phone: dto.phone },
    });
    if (existingPhone)
      throw new ConflictException('A supervisor with this phone number already exists');

    const existingEmail = await this.prisma.supervisor.findUnique({
      where: { email: dto.email },
    });
    if (existingEmail)
      throw new ConflictException('A supervisor with this email already exists');

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const supervisorId = this.generateSupervisorId();

    const supervisor = await this.prisma.supervisor.create({
      data: {
        supervisorId,
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        location: dto.location,
        passwordHash,
        projectId: dto.projectId,
      },
    });

    // Omit passwordHash from response
    const { passwordHash: _, ...result } = supervisor;
    return { ...result, supervisorId };
  }

  // ── List all supervisors for a project ─────────────────────────────────────
  async findByProject(projectId: string, ownerId: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');
    if (project.ownerId !== ownerId) throw new ForbiddenException('Access denied');

    const supervisors = await this.prisma.supervisor.findMany({
      where: { projectId },
      select: {
        id: true,
        supervisorId: true,
        name: true,
        phone: true,
        email: true,
        location: true,
        createdAt: true,
      },
    });
    return supervisors;
  }

  // ── Get supervisor profile (self) ─────────────────────────────────────────
  async findById(id: string) {
    const supervisor = await this.prisma.supervisor.findUnique({
      where: { id },
      select: {
        id: true,
        supervisorId: true,
        name: true,
        phone: true,
        email: true,
        location: true,
        projectId: true,
        createdAt: true,
        project: {
          select: {
            id: true,
            name: true,
            type: true,
            siteAddress: true,
            progress: true,
          },
        },
      },
    });
    if (!supervisor) throw new NotFoundException('Supervisor not found');
    return supervisor;
  }

  // ── Update supervisor (owner or self) ─────────────────────────────────────
  async update(id: string, dto: UpdateSupervisorDto) {
    await this.findById(id);
    return this.prisma.supervisor.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        supervisorId: true,
        name: true,
        phone: true,
        email: true,
        location: true,
        updatedAt: true,
      },
    });
  }

  // ── Delete supervisor ──────────────────────────────────────────────────────
  async remove(id: string, ownerId: string) {
    const supervisor = await this.prisma.supervisor.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!supervisor) throw new NotFoundException('Supervisor not found');
    if (supervisor.project.ownerId !== ownerId)
      throw new ForbiddenException('Access denied');

    return this.prisma.supervisor.delete({ where: { id } });
  }
}
