// src/firebase/firebase.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('connect')
  connectToDatabase(
    @Body()
    firebaseConfig: {
      credential: admin.ServiceAccount;
      databaseURL: string;
    },
  ) {
    try{
        this.firebaseService.connectToDatabase(firebaseConfig);
        return { message: 'Connected to Firebase successfully' };
    }
    catch(ex) {
        return{ message: "Connected to Firebase Failed. ERROR: " + ex.message};
    }
    
  }

  @Get('find/:collection/:id')
  async findDocument(
    @Param('collection') collection: string,
    @Param('id') documentId: string
  ) {
    try {
    console.log('Collection:', collection); // Log for debugging
    console.log('Document ID:', documentId); // Log for debugging
    
    const result = await this.firebaseService.findDocument(collection, documentId);
    if (!result) {
        return { message: 'Document not found', result };
    }
    return { message: 'Document set successfully', result };
    } catch (error) {
        return { message: 'Error finding document. ERROR : ' + error}; // Log the error for debugging
    }
  }

  

  @Post('set/:collection/:id')
  async setDocument(
    @Param('collection') collection: string,
    @Param('id') documentId: string,
    @Body() data: any,
  ) {
    await this.firebaseService.setDocument(collection, documentId, data);
    return { message: 'Document set successfully' };
  }

}
