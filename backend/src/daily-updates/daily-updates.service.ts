import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DailyUpdateCreateDto, DailyUpdateUpdateDto } from './dto/daily-update.dto';
import { WorkerCategory } from '@prisma/client';

@Injectable()
export class DailyUpdatesService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Create daily update for a supervisor (must belong to project) ────────
  async create(supervisorId: string, dto: DailyUpdateCreateDto) {
    const supervisor = await this.prisma.supervisor.findUnique({
      where: { id: supervisorId },
      include: { project: true },
    });
    if (!supervisor) throw new NotFoundException('Supervisor not found');

    // Build worker entry records with totalSalary calculation
    const workerEntries = dto.workerEntries.map((we) => ({
      category: we.category,
      headcount: we.headcount,
      dailyWage: we.dailyWage,
      totalSalary: we.headcount * we.dailyWage,
    }));

    const created = await this.prisma.dailyUpdate.create({
      data: {
        notes: dto.notes,
        supervisorId: supervisor.id,
        projectId: supervisor.projectId,
        workerEntries: { create: workerEntries },
        materialRequests: {
          create: dto.materialRequests.map((mr) => ({
            material: mr.material,
            quantity: mr.quantity,
            unit: mr.unit,
            urgencyLevel: mr.urgencyLevel ?? undefined,
            requiredByDate: new Date(mr.requiredByDate),
          })),
        },
      },
      include: {
        workerEntries: true,
        materialRequests: true,
      },
    });
    return created;
  }

  // ── Get updates for a project (owner) ───────────────────────────────────
  async getByProject(projectId: string, ownerId: string) {
    // Verify ownership
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');
    if (project.ownerId !== ownerId) throw new ForbiddenException('Access denied');

    return this.prisma.dailyUpdate.findMany({
      where: { projectId },
      include: { workerEntries: true, materialRequests: true },
      orderBy: { date: 'desc' },
    });
  }

  // ── Get one's own updates (supervisor) ─────────────────────────────────
  async getBySupervisor(supervisorId: string) {
    return this.prisma.dailyUpdate.findMany({
      where: { supervisorId },
      include: { workerEntries: true, materialRequests: true },
      orderBy: { date: 'desc' },
    });
  }

  // ── Update an existing daily update (owner only) ────────────────────────
  async update(updateId: string, ownerId: string, dto: DailyUpdateUpdateDto) {
    const update = await this.prisma.dailyUpdate.findUnique({
      where: { id: updateId },
      include: { project: true },
    });
    if (!update) throw new NotFoundException('Daily update not found');
    if (update.project.ownerId !== ownerId) throw new ForbiddenException('Access denied');

    // For simplicity, we replace workerEntries and materialRequests entirely
    const data: any = { notes: dto.notes };
    if (dto.workerEntries) {
      data.workerEntries = {
        deleteMany: {},
        create: dto.workerEntries.map((we) => ({
          category: we.category,
          headcount: we.headcount,
          dailyWage: we.dailyWage,
          totalSalary: we.headcount * we.dailyWage,
        })),
      };
    }
    if (dto.materialRequests) {
      data.materialRequests = {
        deleteMany: {},
        create: dto.materialRequests.map((mr) => ({
          material: mr.material,
          quantity: mr.quantity,
          unit: mr.unit,
          urgencyLevel: mr.urgencyLevel ?? undefined,
          requiredByDate: new Date(mr.requiredByDate),
        })),
      };
    }

    return this.prisma.dailyUpdate.update({
      where: { id: updateId },
      data,
      include: { workerEntries: true, materialRequests: true },
    });
  }

  // ── Delete a daily update (owner) ───────────────────────────────────────
  async remove(updateId: string, ownerId: string) {
    const update = await this.prisma.dailyUpdate.findUnique({
      where: { id: updateId },
      include: { project: true },
    });
    if (!update) throw new NotFoundException('Daily update not found');
    if (update.project.ownerId !== ownerId) throw new ForbiddenException('Access denied');
    return this.prisma.dailyUpdate.delete({ where: { id: updateId } });
  }
}
