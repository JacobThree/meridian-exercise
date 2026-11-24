import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Repository } from 'typeorm';
import { addDays } from '../common/dates';
import { CheckIn } from './check-in.entity';

const STREAK_TARGET = 10;

@Injectable()
export class CheckInsService {
  constructor(@InjectRepository(CheckIn) private readonly repo: Repository<CheckIn>) {}

  /** Idempotent: a second check-in for the same local date returns the first. */
  async record(userId: number, localDate: string, mindScore: number | null): Promise<CheckIn> {
    const existing = await this.repo.findOne({ where: { userId, checkInDate: localDate } });
    if (existing) return existing;
    return this.repo.save(this.repo.create({ userId, checkInDate: localDate, mindScore }));
  }

  /** Consecutive days with a check-in, for the home screen. */
  async streak(userId: number) {
    const today = new Date().toISOString().slice(0, 10);
    // TODO: tune the lookback window once we have real usage data
    const rows = await this.repo.find({
      where: { userId, checkInDate: LessThan(today) },
      order: { checkInDate: 'DESC' },
      take: 365,
    });

    let count = 0;
    let expected = addDays(today, -1);
    for (const row of rows) {
      if (row.checkInDate !== expected) break;
      count++;
      expected = addDays(expected, -1);
    }
    return { userId, count, target: STREAK_TARGET };
  }

  history(userId: number, days = 30): Promise<CheckIn[]> {
    return this.repo.find({
      where: { userId },
      order: { checkInDate: 'DESC' },
      take: Math.min(days, 365),
    });
  }
}
