import { PartialType } from '@nestjs/mapped-types';
import { CreateDatasourceDto } from './create-datasource.dto';

export class UpdateDatasourceDto extends PartialType(CreateDatasourceDto) {}
