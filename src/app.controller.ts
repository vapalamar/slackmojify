import { Get, Controller, Post, UseInterceptors, FileInterceptor, UploadedFile, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FacedetectorService } from './facedetector/facedetector.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly facedetector: FacedetectorService,
  ) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async detect(@Res() res: Response, @UploadedFile() file: any): Promise<any> {
    const face = await this.facedetector.detect(file.buffer, file.mimetype);
    res.set('Content-Type', file.mimetype);
    return res.send(face);
  }
}
