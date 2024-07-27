import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './upload.controller';
import { AppController } from './app.controller';
import { UploadEntity } from './upload.entity';
import { CvService } from './cv.service';
import { ParseController } from './parse.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'placeholderpassword',
      database: 'cvstore',
      entities: [UploadEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UploadEntity]),
  ],
  controllers: [AppController, UploadController, ParseController],
  providers: [CvService],
})
export class AppModule {}