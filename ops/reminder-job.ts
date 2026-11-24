import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import { PushService } from './push.service';

/**
 * Morning nudge for participants who have not checked in recently.
 * Product intent (from the spec): "remind participants at 10:00 AM their time
 * if they haven't checked in today".
 */
@Injectable()
export class ReminderJob {
  private readonly logger = new Logger('ReminderJob');

  constructor(
    private readonly db: DataSource,
    private readonly push: PushService,
  ) {}

  // The API server runs in UTC.
  @Cron('0 10 * * *')
  async sendReminders(): Promise<void> {
    this.logger.log('start');

    const candidates: { id: number; push_token: string }[] = await this.db.query(`
      SELECT u.id, u.push_token
      FROM users u
      WHERE u.push_token IS NOT NULL
        AND u.last_check_in_at < NOW() - INTERVAL '24 hours'
        AND u.last_check_in_at > NOW() - INTERVAL '96 hours'
    `);

    let sent = 0;
    let failed = 0;
    for (const c of candidates) {
      try {
        await this.push.send(c.push_token, 'Good morning! Take a minute to check in.');
        sent++;
      } catch (err) {
        failed++;
        this.logger.warn(`push failed for user ${c.id}: ${(err as Error).message}`);
      }
    }

    this.logger.log(`candidates=${candidates.length} sent=${sent} failed=${failed}`);
  }
}
