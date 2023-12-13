import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadsService {
  async uploadToFirebase(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('Archivo no proporcionado');
    }

    const bucket = firebaseAdmin.storage().bucket();
    const fileName = `${uuidv4()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => reject(error));
      stream.on('finish', async () => {
        await fileUpload.makePublic();

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        resolve(publicUrl);
      });

      stream.end(file.buffer);
    });
  }
}
