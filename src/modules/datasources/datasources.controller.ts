/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFiles, UseInterceptors, UseGuards, Request, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { DatasourcesService } from './datasources.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/file-filter.helper';
import { CheckDataSourcesGuard } from './guards/check-datasources.guard';

@Controller('api/datasources')
export class DatasourcesController {
  constructor(private readonly datasourcesService: DatasourcesService) { }

  @Post()
  @UseGuards(CheckDataSourcesGuard)
  @UseInterceptors(AnyFilesInterceptor({
    fileFilter: fileFilter
  }))
  async create(
    @Request() req,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    const client = req.client;

    const filesName = client.filesName || [];
    if (filesName.length === 0) throw new NotFoundException('The client does not have any files, please try again');

    if (files == undefined) throw new NotFoundException('No files were uploaded' + filesName);

    // Obtener los nombres de los archivos subidos y ordenarlos
    const uploadedFileNames = files.map(file => file.originalname).sort();
    console.log('Uploaded file names:', uploadedFileNames);

    // Ordenar los nombres de archivos esperados
    const expectedFileNames = filesName.sort();
    console.log('Expected file names:', expectedFileNames);

    // Comprobar si los nombres de los archivos subidos son idénticos a los nombres esperados
    const filesMatch = JSON.stringify(uploadedFileNames) === JSON.stringify(expectedFileNames);
    if (!filesMatch) {
      throw new BadRequestException('The uploaded files do not match the required files: ' + expectedFileNames.join(', '));
    }

    try {
      // Llamar al servicio para procesar los archivos
      return await this.datasourcesService.create(files, client);
    } catch (error) {
      // Captura cualquier excepción inesperada y lanza un InternalServerErrorException
      throw new InternalServerErrorException('An unexpected error occurred while processing the files' + error);
    }
  }
}
