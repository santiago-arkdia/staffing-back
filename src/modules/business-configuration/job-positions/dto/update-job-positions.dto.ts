
import { PartialType } from "@nestjs/swagger";
import { CreateJobPositionsDto } from "./job-positions.dto";

export class UpdateJobPositionsDto extends PartialType(CreateJobPositionsDto) {}
