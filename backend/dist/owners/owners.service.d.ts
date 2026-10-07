import { PrismaService } from '../prisma/prisma.service';
import { CreateOwnerDto, UpdateOwnerDto } from './dto/owner.dto';
export declare class OwnersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    upsertProfile(ownerId: string, dto: CreateOwnerDto): Promise<{
        phone: string;
        id: string;
        fullName: string;
        email: string | null;
        companyName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findById(id: string): Promise<{
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
    update(id: string, dto: UpdateOwnerDto): Promise<{
        phone: string;
        id: string;
        fullName: string;
        email: string | null;
        companyName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        projects: {
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
        }[];
    } & {
        phone: string;
        id: string;
        fullName: string;
        email: string | null;
        companyName: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
