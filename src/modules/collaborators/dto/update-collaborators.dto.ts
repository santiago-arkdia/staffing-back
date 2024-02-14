/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/swagger";
import { CreateCollaboratorDto } from "./create-collaborators.dto";

export class UpdateCollaboratorDto extends PartialType(CreateCollaboratorDto) {}
