import { Injectable, OnModuleInit } from '@nestjs/common';
import { MongoClient, Db, Collection } from 'mongodb';

@Injectable()
export class MongoService implements OnModuleInit {
  private client: MongoClient;
  private db: Db;
  public collection: Collection;

  async onModuleInit() {
    const uri = '';
    this.client = new MongoClient(uri);
    await this.client.connect();

    this.db = this.client.db('dashboard');
    this.collection = this.db.collection('dashboard-collection');

    console.log('✅ Connected to MongoDB');
  }

  getCollection(): Collection {
    return this.collection;
  }
}
