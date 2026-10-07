import { WorkerCategory, MaterialName, MaterialUnit, UrgencyLevel } from '@prisma/client';
export declare class WorkerEntryDto {
    category: WorkerCategory;
    headcount: number;
    dailyWage: number;
}
export declare class MaterialRequestDto {
    material: MaterialName;
    quantity: number;
    unit: MaterialUnit;
    urgencyLevel?: UrgencyLevel;
    requiredByDate: string;
}
export declare class DailyUpdateCreateDto {
    notes?: string;
    workerEntries: WorkerEntryDto[];
    materialRequests: MaterialRequestDto[];
}
declare const DailyUpdateUpdateDto_base: import("@nestjs/common").Type<Partial<DailyUpdateCreateDto>>;
export declare class DailyUpdateUpdateDto extends DailyUpdateUpdateDto_base {
}
export {};
