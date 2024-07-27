import { Repository } from 'typeorm';
import { UploadEntity } from './upload.entity';
export declare class CvService {
    private readonly uploadRepository;
    private openai;
    constructor(uploadRepository: Repository<UploadEntity>);
    getCV(id: number): Promise<Uint8Array>;
    private uint8ArrayToString;
    parseCV(cvText: string): Promise<string>;
    getParsedCV(id: number): Promise<string>;
}
