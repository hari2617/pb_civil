export declare class CreateOwnerDto {
    fullName: string;
    email?: string;
    companyName?: string;
}
declare const UpdateOwnerDto_base: import("@nestjs/common").Type<Partial<CreateOwnerDto>>;
export declare class UpdateOwnerDto extends UpdateOwnerDto_base {
}
export {};
