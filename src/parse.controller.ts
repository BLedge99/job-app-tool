import { Controller, Get, Param } from '@nestjs/common';
import { CvService } from './cv.service';

@Controller('parse')
export class ParseController {
  constructor(private readonly cvService: CvService) {}

  @Get(':id')
  async getCvData(@Param('id') id: number): Promise<string> {
    return this.cvService.getParsedCV(id);
  }
}