import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { UploadsService } from '../services/uploads.service';

@ApiTags('Uploads')
@Controller('api/uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo a subir',
    type: 'file',
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      
      const result = await this.uploadsService.uploadToFirebase(file);
      const upload: any = {};
      upload.data = result;
      return upload;

    } catch (error) {
      throw new HttpException(
        'Error al subir la imagen',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  
}
