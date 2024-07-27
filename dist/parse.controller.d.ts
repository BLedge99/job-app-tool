import { CvService } from './cv.service';
export declare class ParseController {
    private readonly cvService;
    constructor(cvService: CvService);
    getCvData(id: number): Promise<string>;
}
