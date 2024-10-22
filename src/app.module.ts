import { MongoDBService } from './mongodb/mongodb.service';
import { MongoDBController } from './mongodb/mongodb.controller';
// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongoDBModule } from './mongodb/mongodb.module';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseController } from './firebase/firebase.controller';
import { FirebaseModule } from './firebase/firebase.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [MongoDBModule, FirebaseModule, AppModule],
  providers: [MongoDBService, FirebaseService, AppService],
  controllers: [MongoDBController,FirebaseController, AppController],
})
export class AppModule {}
