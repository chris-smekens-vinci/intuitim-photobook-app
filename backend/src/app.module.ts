import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotosModule } from './photos/photos.module';
import { CategoriesModule } from './categories/categories.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/* His role is to orchestrate the different modules of the application and to set up the database connection. 
It imports the PhotosModule and CategoriesModule, which contain the logic for handling photos and categories,
 respectively. It also sets up the Mongoose connection to MongoDB using the MONGODB_URI environment variable or a default local URI. 
 Finally, it defines the AppController and AppService as part of the application. */

// He assures that all parts of the application are properly wired together and can communicate with each other as needed.
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017/intuitim',
    ),
    PhotosModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
