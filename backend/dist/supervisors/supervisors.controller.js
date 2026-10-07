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
exports.SupervisorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const supervisors_service_1 = require("./supervisors.service");
const supervisor_dto_1 = require("./dto/supervisor.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let SupervisorsController = class SupervisorsController {
    constructor(supervisorsService) {
        this.supervisorsService = supervisorsService;
    }
    create(req, dto) {
        return this.supervisorsService.create(req.user.id, dto);
    }
    getMyProfile(req) {
        return this.supervisorsService.findById(req.user.id);
    }
    findByProject(req, projectId) {
        return this.supervisorsService.findByProject(projectId, req.user.id);
    }
    findOne(id) {
        return this.supervisorsService.findById(id);
    }
    update(id, dto) {
        return this.supervisorsService.update(id, dto);
    }
    remove(req, id) {
        return this.supervisorsService.remove(id, req.user.id);
    }
};
exports.SupervisorsController = SupervisorsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new supervisor (Owner only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Supervisor created' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Phone or email already registered' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, supervisor_dto_1.CreateSupervisorDto]),
    __metadata("design:returntype", void 0)
], SupervisorsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get own supervisor profile (Supervisor only)' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SupervisorsController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Get)('project/:projectId'),
    (0, swagger_1.ApiParam)({ name: 'projectId', description: 'Project ID' }),
    (0, swagger_1.ApiOperation)({ summary: 'List all supervisors for a project (Owner only)' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SupervisorsController.prototype, "findByProject", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Supervisor ID' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get a supervisor by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SupervisorsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Supervisor ID' }),
    (0, swagger_1.ApiOperation)({ summary: 'Update supervisor details' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, supervisor_dto_1.UpdateSupervisorDto]),
    __metadata("design:returntype", void 0)
], SupervisorsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Supervisor ID' }),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a supervisor (Owner only)' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SupervisorsController.prototype, "remove", null);
exports.SupervisorsController = SupervisorsController = __decorate([
    (0, swagger_1.ApiTags)('Supervisors'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('supervisors'),
    __metadata("design:paramtypes", [supervisors_service_1.SupervisorsService])
], SupervisorsController);
//# sourceMappingURL=supervisors.controller.js.map