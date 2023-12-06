/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {CostCenters} from "../../business-configuration/centers-costs/entities/centers-costs.entity";
import {UtilityCenters} from "../../business-configuration/utility-center/entities/utility-center.entity";
import {Collaborator} from "../../collaborators/entities/collaborators.entity";
import {Novelty} from "../../novelty/entities/novelty.entity";

@Schema({collection: 'collaborators-core', timestamps: true})
export class CollaboratorCore {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Collaborator'})
    collaborator: Collaborator[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'CostCenters'})
    costCenter: CostCenters;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'UtilityCenters'})
    utilityCenter: UtilityCenters;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Novelty'})
    novelty: Novelty;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const CollaboratorCoreSchema = SchemaFactory.createForClass(CollaboratorCore);
