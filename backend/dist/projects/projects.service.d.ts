import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
export declare class ProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(ownerId: string, dto: CreateProjectDto): Promise<{
        dailyUpdates: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            supervisorId: string;
            projectId: string;
            date: Date;
            notes: string | null;
        }[];
        supervisors: {
            name: string;
            phone: string;
            id: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            supervisorId: string;
            location: string;
            passwordHash: string;
            projectId: string;
        }[];
    } & {
        name: string;
        type: import(".prisma/client").$Enums.ProjectType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        siteAddress: string;
        latitude: number | null;
        longitude: number | null;
        budget: number | null;
        numberOfFloors: number | null;
        progress: number;
        ownerId: string;
    }>;
    findAllByOwner(ownerId: string): Promise<({
        _count: {
            dailyUpdates: number;
        };
        supervisors: {
            name: string;
            phone: string;
            id: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            supervisorId: string;
            location: string;
            passwordHash: string;
            projectId: string;
        }[];
    } & {
        name: string;
        type: import(".prisma/client").$Enums.ProjectType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        siteAddress: string;
        latitude: number | null;
        longitude: number | null;
        budget: number | null;
        numberOfFloors: number | null;
        progress: number;
        ownerId: string;
    })[]>;
    findOne(id: string, ownerId: string): Promise<{
        dailyUpdates: ({
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
        })[];
        supervisors: {
            name: string;
            phone: string;
            id: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            supervisorId: string;
            location: string;
            passwordHash: string;
            projectId: string;
        }[];
    } & {
        name: string;
        type: import(".prisma/client").$Enums.ProjectType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        siteAddress: string;
        latitude: number | null;
        longitude: number | null;
        budget: number | null;
        numberOfFloors: number | null;
        progress: number;
        ownerId: string;
    }>;
    update(id: string, ownerId: string, dto: UpdateProjectDto): Promise<{
        name: string;
        type: import(".prisma/client").$Enums.ProjectType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        siteAddress: string;
        latitude: number | null;
        longitude: number | null;
        budget: number | null;
        numberOfFloors: number | null;
        progress: number;
        ownerId: string;
    }>;
    remove(id: string, ownerId: string): Promise<{
        name: string;
        type: import(".prisma/client").$Enums.ProjectType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        siteAddress: string;
        latitude: number | null;
        longitude: number | null;
        budget: number | null;
        numberOfFloors: number | null;
        progress: number;
        ownerId: string;
    }>;
    getDashboard(id: string, ownerId: string): Promise<{
        project: {
            id: string;
            name: string;
            type: import(".prisma/client").$Enums.ProjectType;
            siteAddress: string;
            budget: number;
            numberOfFloors: number;
            progress: number;
        };
        stats: {
            totalSupervisors: number;
            totalWorkers: number;
            totalSalaryToday: number;
            totalDailyUpdates: number;
            budget: number;
            progress: number;
        };
    }>;
}
