import { PartialType } from "@nestjs/swagger";
import { CreateSchedulesDto } from './create-schedules.dto';

export class UpdateSchedulesDto extends PartialType(CreateSchedulesDto) {}
