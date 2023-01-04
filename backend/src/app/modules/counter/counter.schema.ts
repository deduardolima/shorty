import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type CounterDocument = Counter & Document;

@Schema()
export class Counter {
    @Prop()
    name: string;

    @Prop()
    shorty_id: string;

    @Prop({ type: Number, default: Date.now })
    create_at: number;

}

export const CounterSchema = SchemaFactory.createForClass(Counter);
CounterSchema.index(
    {
        name: 'text',
        shorty_id: 'text',
    }
)