/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/swagger";
import { CreateCollaboratorDto } from "./create-collaborators.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateCollaboratorDto extends PartialType(CreateCollaboratorDto) {}
