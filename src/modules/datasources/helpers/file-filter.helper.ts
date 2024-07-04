/* eslint-disable @typescript-eslint/ban-types */
// helpers/file-filter.helper.ts
/* eslint-disable prettier/prettier */

import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
  try {
    if (!file) {
      throw new BadRequestException('File not found, please try again');
    }

    // Verifica el tipo MIME del archivo para determinar si es un archivo de Excel
    const validMimeTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Para archivos .xlsx
      'application/vnd.ms-excel', // Para archivos .xls
      'application/vnd.ms-excel.sheet.macroenabled.12' // Para archivos .xlsm
    ];

    if (validMimeTypes.includes(file.mimetype)) {
      // Si el tipo MIME del archivo está dentro de los tipos válidos, se permite la carga
      callback(null, true);
    } else {
      // Si el tipo MIME del archivo no está dentro de los tipos válidos, se rechaza la carga
      throw new BadRequestException('Invalid file type. Please upload a valid Excel file');
    }
  } catch (error) {
    // Captura cualquier error y devuelve una respuesta con el código de estado 400 y un mensaje específico
    callback(new InternalServerErrorException('Invalid file type. Please upload a valid Excel file'), false);
  }
};
