/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {Region} from '../../regions/entities/region.entity';
import {UtilityCenters} from '../../utility-center/entities/utility-center.entity';
import {CostCenters} from '../../centers-costs/entities/centers-costs.entity';
import { HourlyMeshes } from 'src/modules/hourly-meshes/entities/hourly-meshes.entity';

@Schema({collection: 'job-positions', timestamps: true})
export class JobPositions {

    @Prop()
    idExternal: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Region'})
    region: Region;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'UtilityCenters'})
    utilityCenter: UtilityCenters;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'CostCenters'})
    centersCosts: CostCenters;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'HourlyMeshes'})
    hourlyMeshes: HourlyMeshes;

    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop()
    responsibility: string;

    @Prop()
    objective: string;

    @Prop()
    arl: string;

    @Prop()
    state: number;
    
    @Prop({ type: Object })
    more: Record<string, any>;
}

export const JobPositionsSchema = SchemaFactory.createForClass(JobPositions);
