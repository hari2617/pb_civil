"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(ownerId, dto) {
        return this.prisma.project.create({
            data: {
                ...dto,
                ownerId,
            },
            include: { supervisors: true, dailyUpdates: true },
        });
    }
    async findAllByOwner(ownerId) {
        return this.prisma.project.findMany({
            where: { ownerId },
            include: {
                supervisors: true,
                _count: { select: { dailyUpdates: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, ownerId) {
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
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (project.ownerId !== ownerId)
            throw new common_1.ForbiddenException('Access denied');
        return project;
    }
    async update(id, ownerId, dto) {
        await this.findOne(id, ownerId);
        return this.prisma.project.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id, ownerId) {
        await this.findOne(id, ownerId);
        return this.prisma.project.delete({ where: { id } });
    }
    async getDashboard(id, ownerId) {
        const project = await this.findOne(id, ownerId);
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
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map