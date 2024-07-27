import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { Response } from 'express';
import { join } from 'path';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getIndex', () => {
    it('should serve index.html', () => {
      const mockResponse = {
        sendFile: jest.fn(),
      } as unknown as Response;

      appController.getIndex(mockResponse);

      expect(mockResponse.sendFile).toHaveBeenCalledWith(
        join(__dirname, '..', 'public', 'index.html')
      );
    });
  });
});