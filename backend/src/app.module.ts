import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotosModule } from './photos/photos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // prefer env var, otherwise connect to local Mongo without credentials for dev
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017/intuitim',
    ),
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
