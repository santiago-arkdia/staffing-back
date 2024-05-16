import { PartialType } from "@nestjs/swagger";
import { CreatePucDto } from "./create-puc.dto";
import { IsNumber, IsOptional } from "class-validator";

export class UpdatePucDto extends PartialType (CreatePucDto) {

    @IsNumber()
    @IsOptional()
    state: number;

}
