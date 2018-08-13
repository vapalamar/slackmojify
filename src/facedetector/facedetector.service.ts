import { Injectable, BadRequestException } from '@nestjs/common';
import * as cv from 'opencv4nodejs';
import * as mime from 'mime-types';

@Injectable()
export class FacedetectorService {
  private readonly classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_DEFAULT);
  public async detect(imgBuf: Buffer, mimetype: string): Promise<Buffer> {
    const img: cv.Mat = await cv.imdecodeAsync(imgBuf);
    const grayImg: cv.Mat = await img.bgrToGrayAsync();
    const { objects }: { objects: cv.Rect[] } = await this.classifier.detectMultiScaleAsync(grayImg);
    if (!objects.length) {
      throw new BadRequestException('Image does not contain any faces');
    }

    const faceRect: cv.Rect = objects[0];
    const face: cv.Mat = img.getRegion(faceRect);
    const ext: string = `.${mime.extension(mimetype)}`;
    const faceBuf: Buffer = await cv.imencodeAsync(ext, face);

    return faceBuf;
  }
}