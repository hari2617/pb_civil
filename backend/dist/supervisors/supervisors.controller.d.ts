import { SupervisorsService } from './supervisors.service';
import { CreateSupervisorDto, UpdateSupervisorDto } from './dto/supervisor.dto';
export declare class SupervisorsController {
    private readonly supervisorsService;
    constructor(supervisorsService: SupervisorsService);
    create(req: any, dto: CreateSupervisorDto): Promise<{
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
    getMyProfile(req: any): Promise<{
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
    findByProject(req: any, projectId: string): Promise<{
        name: string;
        phone: string;
        id: string;
        email: string;
        createdAt: Date;
        supervisorId: string;
        location: string;
    }[]>;
    findOne(id: string): Promise<{
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
    remove(req: any, id: string): Promise<{
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
