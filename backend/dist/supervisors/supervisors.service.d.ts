import { PrismaService } from '../prisma/prisma.service';
import { CreateSupervisorDto, UpdateSupervisorDto } from './dto/supervisor.dto';
export declare class SupervisorsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private generateSupervisorId;
    create(ownerId: string, dto: CreateSupervisorDto): Promise<{
        supervisorId: string;
        name: string;
        phone: string;
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
        projectId: string;
    }>;
    findByProject(projectId: string, ownerId: string): Promise<{
        name: string;
        phone: string;
        id: string;
        email: string;
        createdAt: Date;
        supervisorId: string;
        location: string;
    }[]>;
    findById(id: string): Promise<{
        project: {
            name: string;
            type: import(".prisma/client").$Enums.ProjectType;
            id: string;
            siteAddress: string;
            progress: number;
        };
        name: string;
        phone: string;
        id: string;
        email: string;
        createdAt: Date;
        supervisorId: string;
        location: string;
        projectId: string;
    }>;
    update(id: string, dto: UpdateSupervisorDto): Promise<{
        name: string;
        phone: string;
        id: string;
        email: string;
        updatedAt: Date;
        supervisorId: string;
        location: string;
    }>;
    remove(id: string, ownerId: string): Promise<{
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
    }>;
}
