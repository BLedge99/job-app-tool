import { Test, TestingModule } from '@nestjs/testing';
import { ParseController } from './parse.controller';
import { CvService } from './openai.service';

describe('ParseController', () => {
  let controller: ParseController;
  let cvService: CvService;

  const mockCvService = {
    getParsedCV: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParseController],
      providers: [
        {
          provide: CvService,
          useValue: mockCvService,
        },
      ],
    }).compile();

    controller = module.get<ParseController>(ParseController);
    cvService = module.get<CvService>(CvService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCvData', () => {
    it('should return parsed CV data', async () => {
      const mockParsedCV = 'Parsed CV data';
      mockCvService.getParsedCV.mockResolvedValue(mockParsedCV);

      const result = await controller.getCvData(1);

      expect(result).toBe(mockParsedCV);
      expect(mockCvService.getParsedCV).toHaveBeenCalledWith(1);
    });

    it('should handle errors from CvService', async () => {
      const errorMessage = 'CV not found';
      mockCvService.getParsedCV.mockRejectedValue(new Error(errorMessage));

      await expect(controller.getCvData(999)).rejects.toThrow(errorMessage);
      expect(mockCvService.getParsedCV).toHaveBeenCalledWith(999);
    });
  });
});