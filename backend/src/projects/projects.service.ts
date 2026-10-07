import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Create a project for the authenticated owner ──────────────────────────
  async create(ownerId: string, dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...dto,
        ownerId,
      },
      include: { supervisors: true, dailyUpdates: true },
    });
  }

  // ── Get all projects belonging to the authenticated owner ─────────────────
  async findAllByOwner(ownerId: string) {
    return this.prisma.project.findMany({
      where: { ownerId },
      include: {
        supervisors: true,
        _count: { select: { dailyUpdates: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ── Get a single project (verifying ownership) ────────────────────────────
  async findOne(id: string, ownerId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        supervisors: true,
        dailyUpdates: {
          include: {
            workerEntries: true,
            materialRequests: true,
          },
          orderBy: { date: 'desc' },
          take: 10,
        },
      },
    });

    if (!project) throw new NotFoundException('Project not found');
    if (project.ownerId !== ownerId)
      throw new ForbiddenException('Access denied');
    return project;
  }

  // ── Update a project ──────────────────────────────────────────────────────
  async update(id: string, ownerId: string, dto: UpdateProjectDto) {
    await this.findOne(id, ownerId);
    return this.prisma.project.update({
      where: { id },
      data: dto,
    });
  }

  // ── Delete a project ──────────────────────────────────────────────────────
  async remove(id: string, ownerId: string) {
    await this.findOne(id, ownerId);
    return this.prisma.project.delete({ where: { id } });
  }

  // ── Get project summary/dashboard stats ───────────────────────────────────
  async getDashboard(id: string, ownerId: string) {
    const project = await this.findOne(id, ownerId);

    // Aggregate total workers from latest daily update
    const latestUpdate = project.dailyUpdates[0];
    let totalWorkers = 0;
    let totalSalaryToday = 0;

    if (latestUpdate) {
      for (const entry of latestUpdate.workerEntries) {
        totalWorkers += entry.headcount;
        totalSalaryToday += entry.totalSalary;
      }
    }

    return {
      project: {
        id: project.id,
        name: project.name,
        type: project.type,
        siteAddress: project.siteAddress,
        budget: project.budget,
        numberOfFloors: project.numberOfFloors,
        progress: project.progress,
      },
      stats: {
        totalSupervisors: project.supervisors.length,
        totalWorkers,
        totalSalaryToday,
        totalDailyUpdates: project.dailyUpdates.length,
        budget: project.budget,
        progress: project.progress,
      },
    };
  }
}
