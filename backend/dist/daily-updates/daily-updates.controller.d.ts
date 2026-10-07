import { DailyUpdatesService } from './daily-updates.service';
import { DailyUpdateCreateDto, DailyUpdateUpdateDto } from './dto/daily-update.dto';
export declare class DailyUpdatesController {
    private readonly dailyUpdatesService;
    constructor(dailyUpdatesService: DailyUpdatesService);
    create(req: any, dto: DailyUpdateCreateDto): Promise<{
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
    getByProject(req: any, projectId: string): Promise<({
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
    getMyUpdates(req: any): Promise<({
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
    update(id: string, req: any, dto: DailyUpdateUpdateDto): Promise<{
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
    remove(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        supervisorId: string;
        projectId: string;
        date: Date;
        notes: string | null;
    }>;
}
