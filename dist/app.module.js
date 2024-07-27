"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const upload_controller_1 = require("./upload.controller");
const app_controller_1 = require("./app.controller");
const upload_entity_1 = require("./upload.entity");
const cv_service_1 = require("./cv.service");
const parse_controller_1 = require("./parse.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'placeholderpassword',
                database: 'cvstore',
                entities: [upload_entity_1.UploadEntity],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([upload_entity_1.UploadEntity]),
        ],
        controllers: [app_controller_1.AppController, upload_controller_1.UploadController, parse_controller_1.ParseController],
        providers: [cv_service_1.CvService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map