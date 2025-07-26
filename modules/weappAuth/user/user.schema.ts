import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export type UserType = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ required: true }) openid: string
    @Prop({ default: uuidv4() }) secretId: string
    @Prop({ default: uuidv4() }) publicId: string
}

export const UserSchema = SchemaFactory.createForClass(User)