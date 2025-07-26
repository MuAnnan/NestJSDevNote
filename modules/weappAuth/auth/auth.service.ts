import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { weappID, weappSecret } from './config'

import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../user/user.schema'

import { JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async getToken(tempCode: string) {
        try {
            const response = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
                params: {
                    appid: weappID,
                    secret: weappSecret,
                    js_code: tempCode,
                    grant_type: 'authorization_code'
                }
            })
            const { openid, errcode } = response.data
            if(errcode) throw new Error('换取openid失败')
            const { secretId } = await this.userModel.findOne({openid}) ?? await this.userModel.create({openid})
            const token = this.jwtService.sign({secretId})
            return {
                code: 200,
                message: 'Login successful',
                data: { token }
            }
        } catch(error) {
            console.error(error)
            return {
                code: 400,
                message: 'Login Failed',
                data: {}
            }
        }
    }
}
