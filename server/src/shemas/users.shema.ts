import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type UsersDocument = User & Document;

@Schema()
export class User {
    @Prop({required:true})
    username:string;

    @Prop({required:true})
    password:string;
    _id:mongoose.Types.ObjectId | string;
}

export const UsersSchema = SchemaFactory.createForClass(User)