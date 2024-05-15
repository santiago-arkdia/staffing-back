import { PartialType } from "@nestjs/swagger";
import { CreatePucDto } from "./create-puc.dto";

export class UpdatePucDto extends PartialType (CreatePucDto) {}
