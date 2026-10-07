import { Role } from '@prisma/client';
export declare class SendOtpDto {
    phone: string;
    role: Role;
}
export declare class VerifyOtpDto {
    phone: string;
    role: Role;
    code: string;
}
