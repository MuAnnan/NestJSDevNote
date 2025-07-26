import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'

import { privateKey } from './config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './auth.strategy'
import { UserSchema } from '../user/user.schema'

@Module({
    imports: [
        PassportModule,
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        JwtModule.register({secret: privateKey, signOptions: { expiresIn: 15 }})
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService],
    exports: [JwtModule]
})
export class AuthModule {}