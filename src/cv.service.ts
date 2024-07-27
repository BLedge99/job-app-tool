import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadEntity } from './upload.entity';

dotenv.config();

@Injectable()
export class CvService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(UploadEntity)
    private readonly uploadRepository: Repository<UploadEntity>
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getCV(id: number): Promise<Uint8Array> {
    const upload = await this.uploadRepository.findOne({ where: { id } });
    if (!upload) {
      throw new Error('CV not found');
    }
    return upload.data;
  }

  private uint8ArrayToString(data: Uint8Array): string {
    return new TextDecoder().decode(data);
  }

  async parseCV(cvText: string): Promise<string> {
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
  
  async getParsedCV(id: number): Promise<string> {
    const cvData = await this.getCV(id);
    const cvText = this.uint8ArrayToString(cvData);
    return this.parseCV(cvText);
  }
}