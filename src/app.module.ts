import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacedetectorService } from './facedetector/facedetector.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FacedetectorService],
})
export class AppModule {}
