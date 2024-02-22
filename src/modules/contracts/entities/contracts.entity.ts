import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Contract {

    @Prop({ type: Number })
    id: number;

    @Prop({ type: String })
    contractCode: string;

    @Prop({ type: String })
    contractType: string;

    @Prop({ type: String })
    settlementType: string;

    @Prop({ type: String })
    paymentFrequency: string;

    @Prop({ type: String })
    client: string;

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

    @Prop({ type: Date })
    contractStartDate: Date;

    @Prop({ type: Date })
    probableRetirementDate: Date;

    @Prop({ type: Date })
    contractEndDate: Date;

    @Prop({ type: String, default: null })
    arl: string;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
