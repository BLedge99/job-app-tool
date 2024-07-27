import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadEntity } from './upload.entity';
import { memoryStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(
    @InjectRepository(UploadEntity)
    private readonly uploadRepository: Repository<UploadEntity>,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(), // Use memory storage instead of disk storage
    }),
  )
  async uploadFile(@UploadedFile() file) {
    if (!file || !file.buffer) {
      throw new BadRequestException('No file uploaded or file buffer is null');
    }

    const newUpload = this.uploadRepository.create({
      filename: file.originalname,
      data: file.buffer, // Store the file buffer
      mimetype: file.mimetype,
    });

    await this.uploadRepository.save(newUpload);
    return { message: 'File uploaded successfully', file };
  }
}
