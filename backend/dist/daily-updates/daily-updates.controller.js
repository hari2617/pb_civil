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
exports.DailyUpdatesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const daily_updates_service_1 = require("./daily-updates.service");
const daily_update_dto_1 = require("./dto/daily-update.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let DailyUpdatesController = class DailyUpdatesController {
    constructor(dailyUpdatesService) {
        this.dailyUpdatesService = dailyUpdatesService;
    }
    create(req, dto) {
        return this.dailyUpdatesService.create(req.user.id, dto);
    }
    getByProject(req, projectId) {
        return this.dailyUpdatesService.getByProject(projectId, req.user.id);
    }
    getMyUpdates(req) {
        return this.dailyUpdatesService.getBySupervisor(req.user.id);
    }
    update(id, req, dto) {
        return this.dailyUpdatesService.update(id, req.user.id, dto);
    }
    remove(id, req) {
        return this.dailyUpdatesService.remove(id, req.user.id);
    }
};
exports.DailyUpdatesController = DailyUpdatesController;
__decorate([
    (0, common_1.Post)('my'),
    (0, swagger_1.ApiOperation)({ summary: 'Supervisor creates a daily update for their project' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Daily update created' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, daily_update_dto_1.DailyUpdateCreateDto]),
    __metadata("design:returntype", void 0)
], DailyUpdatesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('project/:projectId'),
    (0, swagger_1.ApiParam)({ name: 'projectId', description: 'Project ID' }),
    (0, swagger_1.ApiOperation)({ summary: 'Owner retrieves all daily updates for a project' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DailyUpdatesController.prototype, "getByProject", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, swagger_1.ApiOperation)({ summary: 'Supervisor fetches their own daily updates' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DailyUpdatesController.prototype, "getMyUpdates", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Daily update ID' }),
    (0, swagger_1.ApiOperation)({ summary: 'Owner updates a daily update record' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, daily_update_dto_1.DailyUpdateUpdateDto]),
    __metadata("design:returntype", void 0)
], DailyUpdatesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Daily update ID' }),
    (0, swagger_1.ApiOperation)({ summary: 'Owner deletes a daily update' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DailyUpdatesController.prototype, "remove", null);
exports.DailyUpdatesController = DailyUpdatesController = __decorate([
    (0, swagger_1.ApiTags)('DailyUpdates'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('daily-updates'),
    __metadata("design:paramtypes", [daily_updates_service_1.DailyUpdatesService])
], DailyUpdatesController);
//# sourceMappingURL=daily-updates.controller.js.map