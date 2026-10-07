import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(req: any, dto: CreateProjectDto): Promise<{
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
    findAll(req: any): Promise<({
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
    findOne(req: any, id: string): Promise<{
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
    getDashboard(req: any, id: string): Promise<{
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
    update(req: any, id: string, dto: UpdateProjectDto): Promise<{
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
    remove(req: any, id: string): Promise<{
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
}
