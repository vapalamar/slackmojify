import { Get, Controller, Post, UseInterceptors, FileInterceptor, UploadedFile, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { FacedetectorService } from './facedetector/facedetector.service';

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
  async detect(@Res() res: Response, @UploadedFile() file: IFile): Promise<Response> {
    const face = await this.facedetector.detect(file.buffer, file.mimetype);
    res.set('Content-Type', file.mimetype);
    return res.send(face);
  }
}
