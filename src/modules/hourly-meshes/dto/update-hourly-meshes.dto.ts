import { PartialType } from "@nestjs/swagger";
import { CreateHourlyMeshesDto } from "./create-hourly-meshes.dto";

export class UpdateHourlyMeshesDto extends PartialType(CreateHourlyMeshesDto) {}
