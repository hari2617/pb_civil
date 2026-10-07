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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const owners_service_1 = require("./owners.service");
const owner_dto_1 = require("./dto/owner.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let OwnersController = class OwnersController {
    constructor(ownersService) {
        this.ownersService = ownersService;
    }
    getProfile(req) {
        return this.ownersService.findById(req.user.id);
    }
    upsertProfile(req, dto) {
        return this.ownersService.upsertProfile(req.user.id, dto);
    }
};
exports.OwnersController = OwnersController;
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get own owner profile with all projects' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Owner profile returned' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OwnersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('me'),
    (0, swagger_1.ApiOperation)({
        summary: 'Complete / update owner profile',
        description: 'Called after OTP verification to complete registration. ' +
            'Subsequent calls update the profile.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile updated' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, owner_dto_1.CreateOwnerDto]),
    __metadata("design:returntype", void 0)
], OwnersController.prototype, "upsertProfile", null);
exports.OwnersController = OwnersController = __decorate([
    (0, swagger_1.ApiTags)('Owners'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('owners'),
    __metadata("design:paramtypes", [owners_service_1.OwnersService])
], OwnersController);
//# sourceMappingURL=owners.controller.js.map