import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'

@Schema({
    timestamps: true
})

export class User {

    @Prop()
    name: string;

    @Prop({ unique: [true, 'Duplicate email required'] })
    email: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)