import { PrismaService } from '../prisma/prisma.service';
import { DailyUpdateCreateDto, DailyUpdateUpdateDto } from './dto/daily-update.dto';
export declare class DailyUpdatesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(supervisorId: string, dto: DailyUpdateCreateDto): Promise<{
        workerEntries: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category: import(".prisma/client").$Enums.WorkerCategory;
            headcount: number;
            dailyWage: number;
            totalSalary: number;
            dailyUpdateId: string;
        }[];
        materialRequests: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            dailyUpdateId: string;
            material: import(".prisma/client").$Enums.MaterialName;
            quantity: number;
            unit: import(".prisma/client").$Enums.MaterialUnit;
            urgencyLevel: import(".prisma/client").$Enums.UrgencyLevel;
            requiredByDate: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        supervisorId: string;
        projectId: string;
        date: Date;
        notes: string | null;
    }>;
    getByProject(projectId: string, ownerId: string): Promise<({
        workerEntries: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category: import(".prisma/client").$Enums.WorkerCategory;
            headcount: number;
            dailyWage: number;
            totalSalary: number;
            dailyUpdateId: string;
        }[];
        materialRequests: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            dailyUpdateId: string;
            material: import(".prisma/client").$Enums.MaterialName;
            quantity: number;
            unit: import(".prisma/client").$Enums.MaterialUnit;
            urgencyLevel: import(".prisma/client").$Enums.UrgencyLevel;
            requiredByDate: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        supervisorId: string;
        projectId: string;
        date: Date;
        notes: string | null;
    })[]>;
    getBySupervisor(supervisorId: string): Promise<({
        workerEntries: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category: import(".prisma/client").$Enums.WorkerCategory;
            headcount: number;
            dailyWage: number;
            totalSalary: number;
            dailyUpdateId: string;
        }[];
        materialRequests: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            dailyUpdateId: string;
            material: import(".prisma/client").$Enums.MaterialName;
            quantity: number;
            unit: import(".prisma/client").$Enums.MaterialUnit;
            urgencyLevel: import(".prisma/client").$Enums.UrgencyLevel;
            requiredByDate: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        supervisorId: string;
        projectId: string;
        date: Date;
        notes: string | null;
    })[]>;
    update(updateId: string, ownerId: string, dto: DailyUpdateUpdateDto): Promise<{
        workerEntries: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category: import(".prisma/client").$Enums.WorkerCategory;
            headcount: number;
            dailyWage: number;
            totalSalary: number;
            dailyUpdateId: string;
        }[];
        materialRequests: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            dailyUpdateId: string;
            material: import(".prisma/client").$Enums.MaterialName;
            quantity: number;
            unit: import(".prisma/client").$Enums.MaterialUnit;
            urgencyLevel: import(".prisma/client").$Enums.UrgencyLevel;
            requiredByDate: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        supervisorId: string;
        projectId: string;
        date: Date;
        notes: string | null;
    }>;
    remove(updateId: string, ownerId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        supervisorId: string;
        projectId: string;
        date: Date;
        notes: string | null;
    }>;
}
