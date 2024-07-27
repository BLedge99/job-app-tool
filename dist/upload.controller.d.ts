import { Repository } from 'typeorm';
import { UploadEntity } from './upload.entity';
export declare class UploadController {
    private readonly uploadRepository;
    constructor(uploadRepository: Repository<UploadEntity>);
    uploadFile(file: any): Promise<{
        message: string;
        file: any;
    }>;
}
