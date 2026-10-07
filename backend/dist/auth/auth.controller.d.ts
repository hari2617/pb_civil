import { AuthService } from './auth.service';
import { SendOtpDto, VerifyOtpDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    sendOtp(dto: SendOtpDto): Promise<{
        message: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        accessToken: string;
        isNewUser: boolean;
        role: import(".prisma/client").Role;
    }>;
}
