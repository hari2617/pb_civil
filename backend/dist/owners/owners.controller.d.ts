import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/owner.dto';
export declare class OwnersController {
    private readonly ownersService;
    constructor(ownersService: OwnersService);
    getProfile(req: any): Promise<{
        projects: ({
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
        })[];
    } & {
        phone: string;
        id: string;
        fullName: string;
        email: string | null;
        companyName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    upsertProfile(req: any, dto: CreateOwnerDto): Promise<{
        phone: string;
        id: string;
        fullName: string;
        email: string | null;
        companyName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
