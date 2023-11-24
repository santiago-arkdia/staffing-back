/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from "mongoose";
import {UtilityCenters} from "../../business-configuration/utility-center/entities/utility-center.entity";
import {CostCenters} from "../../business-configuration/centers-costs/entities/centers-costs.entity";
import {JobPositions} from "../../business-configuration/job-positions/entities/job-positions.entity";

@Schema({timestamps: true})
export class Collaborator {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String})
    description: string;

    @Prop({type: String})
    documentType: string;

    @Prop({type: String})
    document: string;

    @Prop({type: Number, default: 1})
    status: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'UtilityCenters'})
    utilityCenter: UtilityCenters;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'CostCenters'})
    centersCosts: CostCenters;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'JobPositions'})
    jobPosition: JobPositions;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const CollaboratorSchema = SchemaFactory.createForClass(Collaborator);
