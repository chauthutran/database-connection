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

  @Post('finds/:collection')
  async findDocuments(
    @Param('collection') collection: string,
    @Body() body: { filters: any[], orderByField?: string, orderDirection?: 'asc' | 'desc', limit?: number },
  ) {
    try {
      const { filters, orderByField, orderDirection, limit } = body;
      const result = await this.firebaseService.findDocuments(collection, filters, orderByField, orderDirection, limit);
      return { message: 'Documents found successfully', result };
    } catch (error) {
        return { message: 'Error finding document. ERROR : ' + error}; // Log the error for debugging
    }
  }
  
  @Get('find/:collection/:id')
  async findDocument(
    @Param('collection') collection: string,
    @Param('id') documentId: string
  ) {
    try {
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

  // Route to update a task by ID
  @Put(':id')
  async updateTask(@Param('id') taskId: string, @Body() task: any) {
    await this.firebaseService.updateDocument('tasks', taskId, task);
    return { message: 'Task updated successfully' };
  }

  // Route to delete a task by ID
  @Delete(':id')
  async deleteTask(@Param('id') taskId: string) {
    await this.firebaseService.deleteDocument('tasks', taskId);
    return { message: 'Task deleted successfully' };
  }

}
