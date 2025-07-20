# 概述

可供参考的文档和视频教程:

- [NestJS Docs](https://docs.nestjs.com/) NestJS 官方渐进式教程文档
- [NestJS 教程](https://www.bilibili.com/video/BV1NW421c7kz?spm_id_from=333.788.videopod.episodes&vd_source=9ac83b3ca683e3dcf6e29152632646e8&p=2) 一个讲的很基础实用的干货教程视频
- [NestJS 中文网](https://www.itying.com/nestjs/article-index-id-108.html)





# 初始化 NestJS 后端程序

流程如下：

1. 首先，确保电脑安装了 NodeJS。

2. 之后，初始化 NestJS 程序的框架，有两种方法：

   - 使用 @nestjs/cli 工具初始化：

     ```bash
     npm i -g @nestjs/cli  # 安装 @nestjs/cli 工具
     nest new <project-name>
     ```

   - 使用 Github 代码部署：

     ```bash
     git clone https://github.com/nestjs/typescript-starter.git <project-name>
     cd <project-name>
     npm install
     ```

3. 最后，使用以下命令之一，就可以启动侦听入站的 HTTP 请求 (`http://localhost:3000/`):

   ```bash
   npm run start
   npm run start:dev  # watch mode 该命令会监视文件，自动重新编译和重新加载服务器
   ```

   

参考的文档：

- [NestJS Docs "First steps"](https://docs.nestjs.com/first-steps) 





# NestJS 模块化开发逻辑

初始化好 NestJS 程序后，在 src 文件夹下，可以看到以下几个文件:

`app.controller.ts`、`app.module.ts`、`app.service.ts` 和 `main.ts` 

其中 `main.ts` 是整个 Nest 程序的入口文件；

而 `app.module.ts` 是模块组织文件，在 `main.ts` 中会引入 `app.module.ts` 中声明的实例。

`app.controller.ts` 和 `app.service.ts` 则分别是路由文件和服务文件，`app.controller.ts` 处理各种路由请求，`app.service.ts` 写一些复杂的逻辑代码函数，供 `app.controller.ts` 使用。

`app.controller.ts` 和 `app.service.ts` 创建的实例还要注入到 `app.module.ts` 中。



整个 NestJS 程序开发的逻辑是模块化的。

一般在 src 文件夹下创建 modules 文件夹，在 modules 文件夹中创建模块文件夹。

例如创建了 reMarket 模块文件夹，在模块文件夹中，再创建 `reMarket.module.ts` `reMarket.controller.ts` `reMarket.service.ts` 

`reMarket.module.ts` 还要注入到 `app.module.ts` 中。





# 路由文件代码

一个简单的路由文件示例代码如下:

```typescript
import { Controller, Get } from '@nestjs/common'
import { CatsService } from './cats.service'

@Controller('cats')  // 这里 'cats' ，指的是访问 http://localhost:3000/cats。如果这里没有参数，则访问 http://localhost:3000
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  
  @Get()  // 除了 Get，还有 Post Put Delete Patch Options Head
  findAll(): string {  // 这里函数名任意起，没有影响
    return this.catsService.findAll()  // return 的值，是客户端获取的响应
  }
}
```



参考的文档：

Nest.js 官方文档: https://docs.nestjs.com/controllers

https://www.bilibili.com/video/BV1NW421c7kz?spm_id_from=333.788.videopod.episodes&vd_source=9ac83b3ca683e3dcf6e29152632646e8&p=2



## 使用服务文件中的函数

以上面示例模板中的代码为例。

直接在实例代码中用 `constructor` 导入，使用时直接 `this.catsService.findAll()` 即可



## 处理 Get 参数请求

对于 `localhost:3000/user/add?id=123&name=zhangsan` 这样参数请求的

```js
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class CatsController {
  @Get('add')
  addData(@Query() query) {
    return query;
  }
}
```

其中 query 的值为

`{ "id": "123", "name": "zhangsan" }`

或者也可以用 `@Request`

```js
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class CatsController {
  @Get('add')
  addData(@Request() req) {
    return req.query;
  }
}
```



## 处理 Post 参数请求

对于 post（在 postman 中）对于 body x-www-form-urlencoded 中传入的参数

```js
import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('getToken')
    async getToken(@Body() body: {code: string}) {
        return await this.authService.getToken(body.code)
    }
}
```

这里会得到传入的参数 `{ "id": "123", "name": "zhangsan" }`







# 服务文件代码

示例代码如下:

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsService {
  findAll() {
    return [
      {"title": "新闻111"},
      {"title": "新闻2222"}
    ]
  }
}
```







# 模块文件代码

示例代码如下:

```js
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],  // 这里可以引入其他模块
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```



参考:

官方文档：https://docs.nestjs.com/modules

B站教程视频: https://www.bilibili.com/video/BV1NW421c7kz?spm_id_from=333.788.player.switch&vd_source=9ac83b3ca683e3dcf6e29152632646e8&p=10







# Nest.js 中配置静态资源

在根目录下新建 public 文件夹（NestJS 根目录，不是 src 根目录），该文件夹下存放静态资源图片等

（NestJS 的源代码会被编译为 dist/，放在 src 的外面就不会被编译）

（当然，也可以把图片放在 NestJS 目录以外的地方）

在 `main.ts` 文件下:

```js
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { NestExpressApplication } from "@nestjs/platform-express"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets("public")  // 配置静态资源目录  // 这里 public 在 NestJS 根目录下
  await app.listen(3000)
}
bootstrap()
```

这时就可以直接在网址 `localhost:3000/1.png` 看到对应的静态图片资源



要想在 `localhost:3000/static/1.png` 这样在虚拟目录下访问静态资源

```js
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets('public', {prefix: '/static/'})  // 配置虚拟目录
  await app.listen(3000)
}
bootstrap()
```



参考：

官方文档: https://docs.nestjs.com/techniques/mvc

B站教程视频：https://www.bilibili.com/video/BV1NW421c7kz?spm_id_from=333.788.videopod.episodes&vd_source=9ac83b3ca683e3dcf6e29152632646e8&p=3







# 带守卫的图片路由

```typescript
import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { join } from 'path'
import { JwtAuthGuard } from '@/modules/auth/auth.guard'

@Controller('staticc')
@UseGuards(JwtAuthGuard)
export class FileController {
  @Get(':filename')
  async serveFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join('/Users/annanmu/workspaces/北建有余微信小程序/program/withNestJS/assets', filename)
    res.sendFile(filePath)
  }
}
```







#  处理的上传文件

NestJS 中提供了对应的装饰器，可以方便的上传文件。

创建名为 upload 模块的控制器

```js
// upload.controller.ts
import { ..., UseInterceptors, UploadedFile  } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"

@Controller("upload")
export class UploadController {
  
  @Post()
  @UseInterceptors(FileInterceptor("pic"))  // 上传图片的名称，应与客户端的 <input name="pic" /> 中 name 相对应
  uploadFile(@Body() body, @UploadFile() file: Express.Multer.File) {  // file 就是图片信息
    
  }
}
```

客户端中 form 表单中需要配置 `<form enctype="multipart/form-data">` 

对于微信小程序，ChatGPT 说 "微信小程序中上传文件（比如图片、PDF 等），应使用 Taro.uploadFile 方法，它自动处理 multipart/form-data 的构建和发送。"

file 的图片信息的格式为

```json
{
	filename: "pic",
  originalname: "支付宝支付流程.png",
  encoding: "7bit",
  mimetype: "image/png",
  buffer: <Buffer 89 ...>,
  size: 14481
}
```



将图片放在 public 的 upload 文件夹下

```js
// upload.controller.ts
import { ..., UseInterceptors, UploadedFile  } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { createWriteStream } from "fs"
import { join } from "path"

@Controller("upload")
export class UploadController {
  
  @Post()
  @UseInterceptors(FileInterceptor("pic"))  // 上传图片的名称，应与客户端的 <input name="pic" /> 中 name 相对应
  uploadFile(@Body() body, @UploadFile() file: Express.Multer.File) {  // file 就是图片信息
    var writeStream = createWriteStream(join(__dirname, "../../public/upload", `${Date.now()}-${file.orginalname}`))
    writeStream.write(file.buffer)
    return "上传图片成功"
  }
}
```



上传多个文件：

```js
import { ..., UseInterceptors, UploadedFiles } from "@nestjs/common" // 这里改为 UploadFiles
import { FilesInterceptor } from "@nestjs/platform-express"  // 这里改为 FilesInterceptor
import { createWriteStream } from "fs"
import { join } from "path"

@Controller("upload")
export class UploadController {
  
  @Post()
  @UseInterceptors(FilesInterceptor("pic"))  // 上传图片的名称，应与客户端的 <input name="pic" /> 中 name 相对应
  uploadFile(@Body() body, @UploadFiles() files: Express.Multer.File) {  // files 就是图片信息
    for file in files {
      const writeImage = createWriteStream(join(__dirname, "../../public/upload", `${Date.now()}-${file.orginalname}`))
    	writeStream.write(file.buffer)
    	return "上传图片成功"
    }
  }
}
```

files 将会是数组 [file, file, file, ...]



参考: 

官方文档: https://docs.nestjs.com/techniques/file-upload

B站教程视频: https://www.bilibili.com/video/BV1NW421c7kz?spm_id_from=333.788.videopod.episodes&vd_source=9ac83b3ca683e3dcf6e29152632646e8&p=7





# 中间件文件代码

中间件就是匹配路由之前或者匹配路由完成前的一系列的操作。中间件中如果想往下匹配的话，那么需要写 next()。



示例代码如下:

```js
import { Injectable, NestMiddleware } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    console.log('Request...')
    next()
  }
}
```



在模块中引入这个中间件

```js
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { CatsModule } from './cats/cats.module'

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats')  // 这里表示匹配的路由，如果是 *，表示匹配所有的路由
  }
}
```

这样在路由请求时，首先会先调用中间件，然后再向下匹配。



全局中间件

在 `main.ts` 文件中：(得用函数中间件才行)（直接在 app.use 中使用）

```js
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()

```



参考：

官方文档：https://docs.nestjs.com/middleware

B站教程视频: https://www.bilibili.com/video/BV1NW421c7kz?spm_id_from=333.788.player.switch&vd_source=9ac83b3ca683e3dcf6e29152632646e8&p=8





# 守卫文件代码

守卫就是用于做权限判断的，与中间件类似。

守卫的模板代码:

```tsx
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class LoginGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true  // 这里返回 true，表示拥有权限访问
  }
}
```



其他位置直接引入该文件就可以，不用在模块中添加

使用守卫（在控制器中）

```tsx
@Get('guard')
@UseGuards(AuthGuard)
...
```

也可以直接加在控制器上:

```tsx
@Controller("cats")
@UseGuards(AuthGuard)
...
```





# 配置别名路径

在 `tsconfig.json` 文件中添加:

```
{
    "compilerOptions": {
    		...,
        "paths": {
          	"@/*": ["src/*"]
        }
    }
}
```









# 在 NestJS 中使用 Mongoose 连接和操作 MongoDB

使用 Mongoose，所有内容都源自一个 Schema。每个 Schema 都映射到 MongoDB 的一个集合，并定义该集合中文档的形状。Schema 用于定义 Model。Model 负责创建和读取底层的 MongoDB 数据库中的文档。



基础配置步骤如下:

1. 首先安装所需的依赖，命令如下:

   ```bash
   npm i @nestjs/mongoose mongoose
   ```

2. 在 `app.module.ts` 文件代码中连接指定 MongoDB 数据库，代码如下:

   ```tsx
   import { Module } from '@nestjs/common'
   import { MongooseModule } from '@nestjs/mongoose'
   
   @Module({
     imports: [MongooseModule.forRoot('mongodb://localhost/uYu')],  // 这里 "uYu" 就是指定的数据库，如果没有的话会自动创建
   })
   export class AppModule {}
   ```

3. 声明 Schema (数据结构)。例如，这里声明 `cat.schema.ts` (文件位置自己安排):

   ```tsx
   import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
   import { HydratedDocument } from 'mongoose'
   
   export type CatDocument = HydratedDocument<Cat>  // 导出 Cat 的 Type
   
   @Schema()
   export class Cat {
     @Prop() name: string;
     @Prop() age: number;
     @Prop() breed: string;
   }
   
   export const CatSchema = SchemaFactory.createForClass(Cat)  // 导出 CatSchema
   ```

   这里也可以用 mongoose 原生方法去创建：

   ```tsx
   import * as mongoose from 'mongoose'
   
   export const CatSchema = new mongoose.Schema({
     name: String,
     age: Number,
     breed: String,
   })
   ```

4. 注册 Model: (要使用该模型的的子模块都要注册)

   ```tsx
   import { Module } from '@nestjs/common'
   import { CatsController } from './cats.controller'
   import { CatsService } from './cats.service'
   
   import { MongooseModule } from '@nestjs/mongoose'
   import { CatSchema } from './schemas/cat.schema'
   
   @Module({
     imports: [MongooseModule.forFeature([{ name: "Cat", schema: CatSchema }])],  // 这里的 Cat 就是创建的 Model 的名字
     controllers: [CatsController],
     providers: [CatsService],
   })
   export class CatsModule {}
   ```

5. 注册了 Model，就可以在 service 中使用 `@InjectModel()` 装饰器将注册的模型 `"Cat"` 注入进来，对其进行 与 mongoose 原生方式相同的增删改查等功能，例如:

   ```tsx
   import { Model } from 'mongoose'
   import { Injectable } from '@nestjs/common'
   import { InjectModel } from '@nestjs/mongoose'
   import { Cat } from './schemas/cat.schema'
   
   @Injectable()
   export class CatsService {
     constructor(@InjectModel('ReMarket') private catModel: Model<ReMarket>) {}
   
     async create(createCatDto: CreateCatDto): Promise<Cat> {
       this.userModel.create({ })  // 可以用 mongoose 中的任何操作
     }
   
     async findAll(): Promise<Cat[]> {
       return this.catModel.find().exec();
     }
   }
   ```
   
   



在微信小程序中的实操:

```tsx
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User } from "./user.schema"

import axios from "axios"

@Injectable()
export class UserService {
    constructor(@InjectModel("User") private userModel: Model<User>) {}

    async login(code: string) {
        axios.get("https://api.weixin.qq.com/sns/jscode2session", {
            params: {
                appid: "wx0a51b4fbdef1fdb8",
                secret: "d4eca9f866d9ae1f541b9a7361dd0235",
                js_code: code,
                grant_type: "authorization_code"
            }
        }).then(response => {
            console.log(response.data)
            this.userModel.create({  // 创建文档，这里与 mongoose 中的方法一致
                openid: response.data.openid,
                id: "123",
                tokenid: "456"
            })
        }).catch(error => {
            console.log("error", error)
        })
    }

    async findAll() {
        return await this.userModel.find().exec()
    }
}
```



## 测试事项

如果 post 时的值不是 定义中的字段，则不会被添加到数据库中的

字段项是可以少的

如果一个属性是必须的，可以加上参数

```typescript
@Prop({ required: true })
name: string;
```





## 数据结构的定义





参考:

官方文档: https://docs.nestjs.com/techniques/mongodb

B站教程视频: https://www.bilibili.com/video/BV1NW421c7kz?spm_id_from=333.788.videopod.episodes&vd_source=9ac83b3ca683e3dcf6e29152632646e8&p=12











# 验证微信小程序登录

https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-login/code2Session.html



微信小程序 code2Session 使用临时 code 换取用户 openid

正常返回 errcode 是 0，错误时返回 errcode 有值





正常返回是

```
  data: {
    session_key: 'MoNiNbnZdMzdfSzKnskbhw==',
    openid: 'oWFVb7FS6ExoYrR6VR9OfeOw-0w0'
  }
```

不正常会有 errcode

```
  data: {
    errcode: 40029,
    errmsg: 'invalid code, rid: 68232d50-1b3aecb7-4b818a39'
  }
```

status 都是 200







# NestJS 配置校验 JWT Token

安装所需的依赖

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt @types/passport-jwt
```

创建 JwtAuthGuard

```tsx
// src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

创建 JwtStrategy

```tsx
// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { privateKey } from '@/config/secret'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从 header 提取
      ignoreExpiration: true, // 忽略过期
      secretOrKey: privateKey, // ⚠️ 这里要和 sign 的 key 一致
    })
  }

  async validate(payload: any) {
    return { secretId: payload.secretId }
  }
}
```

创建 AuthModule

```tsx
// src/auth/auth.module.ts
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy],
})
export class AuthModule {}
```

在要使用该守卫的模块里注入

```tsx
// src/modules/user/user.module.ts

import { Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { MongooseModule } from '@nestjs/mongoose' 
import { UserSchema } from '@/schemas/user.schema'
import { AuthModule } from "@/auth/auth.module"

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        AuthModule
    ],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
```

在控制器中使用守卫

```tsx
// src/modules/user/user.controller.ts

import { Controller, Get, UseGuards, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(@Request() request) {
        console.log(request.user)  // 这里是 token 中解析出的信息 { secretId: 'b90bdd56-3eb5-47e6-a51a-d9813cd35389' }
        return await this.userService.findAll()
    }
}
```





如果 token 过期，状态码会是 401