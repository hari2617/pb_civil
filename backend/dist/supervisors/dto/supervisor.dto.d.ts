export declare class CreateSupervisorDto {
    name: string;
    phone: string;
    email: string;
    location: string;
    password: string;
    projectId: string;
}
declare const UpdateSupervisorDto_base: import("@nestjs/common").Type<Partial<Omit<CreateSupervisorDto, "projectId" | "password">>>;
export declare class UpdateSupervisorDto extends UpdateSupervisorDto_base {
}
export declare class SupervisorLoginDto {
    phone: string;
    password: string;
}
export {};
