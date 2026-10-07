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
exports.DailyUpdatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DailyUpdatesService = class DailyUpdatesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(supervisorId, dto) {
        const supervisor = await this.prisma.supervisor.findUnique({
            where: { id: supervisorId },
            include: { project: true },
        });
        if (!supervisor)
            throw new common_1.NotFoundException('Supervisor not found');
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
    async getByProject(projectId, ownerId) {
        const project = await this.prisma.project.findUnique({ where: { id: projectId } });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (project.ownerId !== ownerId)
            throw new common_1.ForbiddenException('Access denied');
        return this.prisma.dailyUpdate.findMany({
            where: { projectId },
            include: { workerEntries: true, materialRequests: true },
            orderBy: { date: 'desc' },
        });
    }
    async getBySupervisor(supervisorId) {
        return this.prisma.dailyUpdate.findMany({
            where: { supervisorId },
            include: { workerEntries: true, materialRequests: true },
            orderBy: { date: 'desc' },
        });
    }
    async update(updateId, ownerId, dto) {
        const update = await this.prisma.dailyUpdate.findUnique({
            where: { id: updateId },
            include: { project: true },
        });
        if (!update)
            throw new common_1.NotFoundException('Daily update not found');
        if (update.project.ownerId !== ownerId)
            throw new common_1.ForbiddenException('Access denied');
        const data = { notes: dto.notes };
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
    async remove(updateId, ownerId) {
        const update = await this.prisma.dailyUpdate.findUnique({
            where: { id: updateId },
            include: { project: true },
        });
        if (!update)
            throw new common_1.NotFoundException('Daily update not found');
        if (update.project.ownerId !== ownerId)
            throw new common_1.ForbiddenException('Access denied');
        return this.prisma.dailyUpdate.delete({ where: { id: updateId } });
    }
};
exports.DailyUpdatesService = DailyUpdatesService;
exports.DailyUpdatesService = DailyUpdatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DailyUpdatesService);
//# sourceMappingURL=daily-updates.service.js.map