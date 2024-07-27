import { Test, TestingModule } from '@nestjs/testing';
import { CvService } from './cv.service';
import { NotFoundException } from '@nestjs/common';

describe('CvService', () => {
  let service: CvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvService],
    }).compile();

    service = module.get<CvService>(CvService);
    service['cvs'] = []; // Initialize empty storage
  });

  it('should save a CV with a unique ID', async () => {
    const file = { buffer: Buffer.from('example CV content') } as Express.Multer.File;
    const id = 'test-id';
    const result = await service.saveCV(id, file);
    expect(result.id).toBe(id);
    expect(service['cvs'].length).toBe(1);
    expect(service['cvs'][0].id).toBe(id);
  });

  it('should retrieve a CV by ID', () => {
    const cv = { id: '123', file: { buffer: Buffer.from('example CV content') } };
    service['cvs'].push(cv);
    expect(service.getCV('123')).toEqual(cv);
  });

  it('should throw NotFoundException if CV is not found', () => {
    expect(() => service.getCV('999')).toThrow(NotFoundException);
  });

  it('should parse a CV by ID', async () => {
    const cv = { id: '123', file: { buffer: Buffer.from('example CV content') } };
    service['cvs'].push(cv);
    const parsedCV = await service.getParsedCV('123');
    // Add assertions for parsed CV
  });
});
