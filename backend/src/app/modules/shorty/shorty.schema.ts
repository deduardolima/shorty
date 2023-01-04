import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShortyDocument = Shorty & Document;

@Schema()
export class Shorty {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({ default: false })
    sms: boolean;

    @Prop()
    link_destino: string;

    @Prop()
    start_date: number;

    @Prop()
    finish_date: number | null;

    @Prop({ default: 0 })
    status: number;

    @Prop({ unique: true})
    shorty: string;

    @Prop()
    origem: string;

    @Prop({ type: Number, default: Date.now })
    create_at: string;

    constructor(shorty?: Partial<Shorty>) {
        this.name = shorty?.name;
        this.description = shorty?.description;
        this.sms = shorty?.sms;
        this.link_destino = shorty?.link_destino;
        this.start_date = shorty?.start_date;
        this.finish_date = shorty?.finish_date;
        this.status = shorty?.status;
        this.shorty = shorty?.shorty;
        this.shorty = shorty?.origem;
        this.shorty = shorty?.create_at;

    }
}

export const ShortySchema = SchemaFactory.createForClass(Shorty);
ShortySchema.index(
    {
        name: 'text',
        shorty: 'text',
        description: 'text',
    }
);