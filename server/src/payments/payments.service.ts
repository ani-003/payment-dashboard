import { Injectable } from '@nestjs/common';
import { MongoService } from '../database/mongo.service';
import { ObjectId } from 'mongodb';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  constructor(private readonly mongo: MongoService) { }

  // ✅ Create a new payment
  async create(payment: any) {
    const result = await this.mongo.getCollection().insertOne({
      ...payment,
      createdAt: new Date(payment.createdAt || Date.now()),
    });

    return this.mongo.getCollection().findOne({ _id: result.insertedId });
  }


async findAll(query: any) {
  const collection = this.mongo.getCollection();
  const {
    status,
    method,
    startDate,
    endDate,
    page = 1,
    limit = 10,
  } = query;

  const filter: any = {};

  if (status) filter.status = status;
  if (method) filter.method = method;

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = end;
    }
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  const total = await collection.countDocuments(filter);
  const data = await collection
    .find(filter)
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum)
    .toArray();

  return {
    total,
    page: pageNum,
    limit: limitNum,
    data,
  };
}



  // ✅ Get a single payment by ID
  async findOne(id: string) {
    const { ObjectId } = require('mongodb');

    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid payment ID format');
    }

    return this.mongo.getCollection().findOne({ _id: new ObjectId(id) });
  }

  async getStats() {
    const payments = await this.mongo.getCollection().find().toArray();
    const now = new Date();

    const today = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday

    const daysAgo = (days: number) => {
      const d = new Date(now);
      d.setDate(d.getDate() - days);
      return d;
    };

    const getDateStr = (d: Date) => d.toISOString().slice(0, 10);

    let totalRevenue = 0;
    let totalPaymentsToday = 0;
    let totalPaymentsThisWeek = 0;
    let totalPaymentsLast7Days = 0;
    let totalPaymentsLast15Days = 0;
    let totalPaymentsLast30Days = 0;
    let failedTransactions = 0;

    const dailyRevenueMap = new Map<string, number>();

    for (const payment of payments) {
      const created = new Date(payment.createdAt);
      const dateStr = getDateStr(created);

      // Revenue
      if (payment.status === 'success') {
        totalRevenue += payment.amount;

        // Track per-day revenue
        if (!dailyRevenueMap.has(dateStr)) {
          dailyRevenueMap.set(dateStr, 0);
        }
        dailyRevenueMap.set(dateStr, dailyRevenueMap.get(dateStr)! + payment.amount);
      }

      // Time-based stats
      if (dateStr === today) totalPaymentsToday++;
      if (created >= startOfWeek) totalPaymentsThisWeek++;
      if (created >= daysAgo(7)) totalPaymentsLast7Days++;
      if (created >= daysAgo(15)) totalPaymentsLast15Days++;
      if (created >= daysAgo(30)) totalPaymentsLast30Days++;

      // Fail count
      if (payment.status === 'failed') failedTransactions++;
    }

    // Format breakdown: last 7 days
    const dailyRevenueBreakdown = Array.from({ length: 7 }).map((_, i) => {
      const d = getDateStr(daysAgo(6 - i));
      return { date: d, revenue: dailyRevenueMap.get(d) || 0 };
    });

    return {
      totalRevenue,
      totalPaymentsToday,
      totalPaymentsThisWeek,
      totalPaymentsLast7Days,
      totalPaymentsLast15Days,
      totalPaymentsLast30Days,
      failedTransactions,
      dailyRevenueBreakdown,
    };
  }




}
