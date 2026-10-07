"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async sendOtp(dto) {
        const { phone } = dto;
        const sid = this.configService.get('TWILIO_ACCOUNT_SID');
        const token = this.configService.get('TWILIO_AUTH_TOKEN');
        const verifySid = this.configService.get('TWILIO_VERIFY_SERVICE_SID');
        if (!sid || sid === 'your_twilio_account_sid' || !verifySid) {
            throw new common_1.BadRequestException('Twilio Verify is not configured properly.');
        }
        try {
            const twilio = require('twilio');
            const client = twilio(sid, token);
            await client.verify.v2.services(verifySid).verifications.create({
                to: `+91${phone}`,
                channel: 'sms',
            });
            return { message: `OTP sent to ${phone} via Twilio Verify.` };
        }
        catch (err) {
            console.error('Twilio Verify Send error:', err?.message ?? err);
            throw new common_1.BadRequestException('Failed to send OTP.');
        }
    }
    async verifyOtp(dto) {
        const { phone, role, code } = dto;
        const sid = this.configService.get('TWILIO_ACCOUNT_SID');
        const token = this.configService.get('TWILIO_AUTH_TOKEN');
        const verifySid = this.configService.get('TWILIO_VERIFY_SERVICE_SID');
        if (!sid || sid === 'your_twilio_account_sid' || !verifySid) {
            throw new common_1.BadRequestException('Twilio Verify is not configured properly.');
        }
        try {
            const twilio = require('twilio');
            const client = twilio(sid, token);
            const verificationCheck = await client.verify.v2.services(verifySid).verificationChecks.create({
                to: `+91${phone}`,
                code: code,
            });
            if (verificationCheck.status !== 'approved') {
                throw new common_1.UnauthorizedException('Invalid OTP. Please try again.');
            }
        }
        catch (err) {
            console.error('Twilio Verify Check error:', err?.message ?? err);
            throw new common_1.UnauthorizedException('Invalid OTP or expired.');
        }
        let userId;
        let isNewUser = false;
        if (role === client_1.Role.OWNER) {
            const owner = await this.prisma.owner.findUnique({ where: { phone } });
            if (owner) {
                userId = owner.id;
            }
            else {
                const newOwner = await this.prisma.owner.create({
                    data: { phone, fullName: '' },
                });
                userId = newOwner.id;
                isNewUser = true;
            }
        }
        else {
            const supervisor = await this.prisma.supervisor.findUnique({ where: { phone } });
            if (!supervisor) {
                throw new common_1.UnauthorizedException('No supervisor account found for this phone number. Please contact your project owner.');
            }
            userId = supervisor.id;
        }
        const payload = { sub: userId, phone, role };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken, isNewUser, role };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map