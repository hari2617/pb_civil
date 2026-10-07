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
exports.DailyUpdateUpdateDto = exports.DailyUpdateCreateDto = exports.MaterialRequestDto = exports.WorkerEntryDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class WorkerEntryDto {
}
exports.WorkerEntryDto = WorkerEntryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.WorkerCategory }),
    (0, class_validator_1.IsEnum)(client_1.WorkerCategory),
    __metadata("design:type", String)
], WorkerEntryDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of workers for this category' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], WorkerEntryDto.prototype, "headcount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Daily wage per worker (INR)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], WorkerEntryDto.prototype, "dailyWage", void 0);
class MaterialRequestDto {
}
exports.MaterialRequestDto = MaterialRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.MaterialName }),
    (0, class_validator_1.IsEnum)(client_1.MaterialName),
    __metadata("design:type", String)
], MaterialRequestDto.prototype, "material", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Requested quantity' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], MaterialRequestDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.MaterialUnit }),
    (0, class_validator_1.IsEnum)(client_1.MaterialUnit),
    __metadata("design:type", String)
], MaterialRequestDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.UrgencyLevel, description: 'Urgency of request' }),
    (0, class_validator_1.IsEnum)(client_1.UrgencyLevel),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MaterialRequestDto.prototype, "urgencyLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date by which material is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MaterialRequestDto.prototype, "requiredByDate", void 0);
class DailyUpdateCreateDto {
}
exports.DailyUpdateCreateDto = DailyUpdateCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Optional notes for the day' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DailyUpdateCreateDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [WorkerEntryDto] }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], DailyUpdateCreateDto.prototype, "workerEntries", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MaterialRequestDto] }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], DailyUpdateCreateDto.prototype, "materialRequests", void 0);
class DailyUpdateUpdateDto extends (0, swagger_1.PartialType)(DailyUpdateCreateDto) {
}
exports.DailyUpdateUpdateDto = DailyUpdateUpdateDto;
//# sourceMappingURL=daily-update.dto.js.map