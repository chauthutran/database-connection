import { Injectable } from '@nestjs/common';

import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private isConnected = false;
  // private firestore: FirebaseFirestore.Firestore;

  /**
   * 
   * @param firebaseConfig {
                "credential": {
                    "projectId": "your-project-id",
                    "clientEmail": "your-client-email",
                    "privateKey": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
                },
                "databaseURL": "https://<your-database-name>.firebaseio.com"
            }
   */
  connectToDatabase(firebaseConfig: {
    credential: admin.ServiceAccount;
    databaseURL: string;
  }) {
    if (!this.isConnected) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig.credential),
        databaseURL: firebaseConfig.databaseURL,
      });
      this.isConnected = true;
    } else {
      console.warn('Firebase is already connected');
    }
  }

  // Method to get data from a Firestore collection
  async findDocuments(collection: string): Promise<any> {
    const result = await admin
      .firestore()
      .collection(collection)
      .get();
    // return doc.exists ? doc.data() : null;
    return result.docs.map(doc => doc.data());
  }

  // Method to get data from a Firestore collection
  async findDocument(collection: string, documentId: string): Promise<any> {
    const doc = await admin
      .firestore()
      .collection(collection)
      .doc(documentId)
      .get();
    return doc.exists ? doc.data() : null;
  }

  // Method to set data in a Firestore collection
  async setDocument(
    collection: string,
    documentId: string,
    data: any,
  ): Promise<any> {
    return admin.firestore().collection(collection).doc(documentId).set(data);
  }
  
  // Method to update data in a Firestore collection
  async updateDocument(
    collection: string,
    documentId: string,
    data: any,
  ): Promise<any> {
    return admin
      .firestore()
      .collection(collection)
      .doc(documentId)
      .update(data);
  }

  // Method to delete a document in a Firestore collection
  async deleteDocument(collection: string, documentId: string): Promise<any> {
    return admin.firestore().collection(collection).doc(documentId).delete();
  }
}
