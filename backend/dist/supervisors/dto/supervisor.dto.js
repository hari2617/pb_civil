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
exports.SupervisorLoginDto = exports.UpdateSupervisorDto = exports.CreateSupervisorDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSupervisorDto {
}
exports.CreateSupervisorDto = CreateSupervisorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Suresh Babu' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateSupervisorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8765432109' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[6-9]\d{9}$/, { message: 'Enter a valid 10-digit mobile number' }),
    __metadata("design:type", String)
], CreateSupervisorDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'suresh@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSupervisorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ambattur Industrial Estate, Chennai' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSupervisorDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'secure123', minLength: 6 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateSupervisorDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clxyz123', description: 'Project ID the supervisor belongs to' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSupervisorDto.prototype, "projectId", void 0);
class UpdateSupervisorDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(CreateSupervisorDto, ['password', 'projectId'])) {
}
exports.UpdateSupervisorDto = UpdateSupervisorDto;
class SupervisorLoginDto {
}
exports.SupervisorLoginDto = SupervisorLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8765432109' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[6-9]\d{9}$/, { message: 'Enter a valid 10-digit mobile number' }),
    __metadata("design:type", String)
], SupervisorLoginDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'secure123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SupervisorLoginDto.prototype, "password", void 0);
//# sourceMappingURL=supervisor.dto.js.map