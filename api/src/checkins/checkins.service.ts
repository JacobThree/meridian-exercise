import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckIn } from './check-in.entity';

@Injectable()
export class CheckInsService {
  constructor(@InjectRepository(CheckIn) private readonly repo: Repository<CheckIn>) {}

  /** Idempotent: a second check-in for the same local date returns the first. */
  async record(userId: number, localDate: string, mindScore: number | null): Promise<CheckIn> {
    const existing = await this.repo.findOne({ where: { userId, checkInDate: localDate } });
    if (existing) return existing;
    return this.repo.save(this.repo.create({ userId, checkInDate: localDate, mindScore }));
  }

  history(userId: number, days = 30): Promise<CheckIn[]> {
    return this.repo.find({
      where: { userId },
      order: { checkInDate: 'DESC' },
      take: Math.min(days, 365),
    });
  }
}
