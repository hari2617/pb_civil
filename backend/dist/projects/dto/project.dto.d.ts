import { ProjectType } from '@prisma/client';
export declare class CreateProjectDto {
    name: string;
    type: ProjectType;
    siteAddress: string;
    latitude?: number;
    longitude?: number;
    budget?: number;
    numberOfFloors?: number;
}
declare const UpdateProjectDto_base: import("@nestjs/common").Type<Partial<CreateProjectDto>>;
export declare class UpdateProjectDto extends UpdateProjectDto_base {
    progress?: number;
}
export {};
