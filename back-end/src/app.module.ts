import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './photo/photo.module';
import { AnniversaryModule } from './anniversary/anniversary.module';
import { MessageModule } from './message/message.module';
import { TodoModule } from './todo/todo.module';
import { EmoticonModule } from './emoticon/emoticon.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/./**/*.entity.{js,ts}'],
        synchronize: true, //生产环境
      }),
    }),
    AuthModule,
    UserModule,
    AlbumModule,
    PhotoModule,
    AnniversaryModule,
    MessageModule,
    TodoModule,
    EmoticonModule,
  ],
})
export class AppModule {}
