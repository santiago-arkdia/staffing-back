import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';
import * as mongoose from 'mongoose';
import { Client } from 'src/modules/clients/entities/client.entity';
import { Collaborator } from 'src/modules/collaborators/entities/collaborators.entity';

@Schema({ timestamps: true })
export class Contract {
    
    @Prop({ type: String })
    contractCode: string;

    @Prop({ type: String })
    contractType: string;

    @Prop({ type: String })
    settlementType: string;

    @Prop({ type: String })
    paymentFrequency: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Client'})
    client: Client;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Collaborator'})
    collaborator: Collaborator;

    @Prop({ type: String })
    pensionFund: string;

    @Prop({ type: String })
    epsEntity: string;

    @Prop({ type: String })
    severanceFund: string;

    @Prop({ type: String })
    compensationFund: string;

    @Prop({ type: String })
    workCity: string;

    @Prop({ type: String })
    riskGrade: string;

    @Prop({ type: String })
    transportationAssistance: string;

    @Prop({ type: String })
    contractStartDate: string;

    @Prop({ type: String })
    probableRetirementDate: string;

    @Prop({ type: String })
    contractEndDate: string;

    @Prop({ type: String, default: null })
    arl: string;

    @IsNumber()
    idTri: number;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
