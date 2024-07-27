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
exports.CvService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const dotenv = require("dotenv");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const upload_entity_1 = require("./upload.entity");
dotenv.config();
let CvService = class CvService {
    constructor(uploadRepository) {
        this.uploadRepository = uploadRepository;
        this.openai = new openai_1.OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    async getCV(id) {
        const upload = await this.uploadRepository.findOne({ where: { id } });
        if (!upload) {
            throw new Error('CV not found');
        }
        return upload.data;
    }
    uint8ArrayToString(data) {
        return new TextDecoder().decode(data);
    }
    async parseCV(cvText) {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a CV parser. Extract key information such as name, education, work experience, and skills.'
                },
                {
                    role: 'user',
                    content: `Parse the following CV:\n\n${cvText}`
                }
            ],
            temperature: 0.5,
        });
        return response.choices[0].message.content.trim();
    }
    async getParsedCV(id) {
        const cvData = await this.getCV(id);
        const cvText = this.uint8ArrayToString(cvData);
        return this.parseCV(cvText);
    }
};
exports.CvService = CvService;
exports.CvService = CvService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(upload_entity_1.UploadEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CvService);
//# sourceMappingURL=cv.service.js.map