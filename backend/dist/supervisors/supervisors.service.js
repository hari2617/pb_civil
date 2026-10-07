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
exports.SupervisorsService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const SALT_ROUNDS = 12;
let SupervisorsService = class SupervisorsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateSupervisorId() {
        const last6 = Date.now().toString().slice(-6);
        return `SUP-${last6}`;
    }
    async create(ownerId, dto) {
        const project = await this.prisma.project.findUnique({
            where: { id: dto.projectId },
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (project.ownerId !== ownerId)
            throw new common_1.ForbiddenException('Cannot add supervisor to another owner\'s project');
        const existingPhone = await this.prisma.supervisor.findUnique({
            where: { phone: dto.phone },
        });
        if (existingPhone)
            throw new common_1.ConflictException('A supervisor with this phone number already exists');
        const existingEmail = await this.prisma.supervisor.findUnique({
            where: { email: dto.email },
        });
        if (existingEmail)
            throw new common_1.ConflictException('A supervisor with this email already exists');
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
        const { passwordHash: _, ...result } = supervisor;
        return { ...result, supervisorId };
    }
    async findByProject(projectId, ownerId) {
        const project = await this.prisma.project.findUnique({ where: { id: projectId } });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (project.ownerId !== ownerId)
            throw new common_1.ForbiddenException('Access denied');
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
    async findById(id) {
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
        if (!supervisor)
            throw new common_1.NotFoundException('Supervisor not found');
        return supervisor;
    }
    async update(id, dto) {
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
    async remove(id, ownerId) {
        const supervisor = await this.prisma.supervisor.findUnique({
            where: { id },
            include: { project: true },
        });
        if (!supervisor)
            throw new common_1.NotFoundException('Supervisor not found');
        if (supervisor.project.ownerId !== ownerId)
            throw new common_1.ForbiddenException('Access denied');
        return this.prisma.supervisor.delete({ where: { id } });
    }
};
exports.SupervisorsService = SupervisorsService;
exports.SupervisorsService = SupervisorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SupervisorsService);
//# sourceMappingURL=supervisors.service.js.map