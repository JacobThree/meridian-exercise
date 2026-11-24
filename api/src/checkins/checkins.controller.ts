import { Body, Controller, Get, Logger, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { CheckInsService } from './checkins.service';

class RecordCheckInDto {
  localDate: string; // YYYY-MM-DD, computed on the phone
  mindScore?: number;
}

@Controller('checkins')
@UseGuards(JwtAuthGuard)
export class CheckInsController {
  private readonly logger = new Logger(CheckInsController.name);

  constructor(
    private readonly service: CheckInsService,
    private readonly users: UsersService,
  ) {}

  @Post()
  record(@Req() req: { user: { id: number } }, @Body() dto: RecordCheckInDto) {
    return this.service.record(req.user.id, dto.localDate, dto.mindScore ?? null);
  }

  @Get('history')
  history(@Req() req: { user: { id: number } }, @Query('days') days?: string) {
    return this.service.history(req.user.id, days ? Number(days) : 30);
  }

  @Get('streak')
  async streak(@Query('userId') userId: string) {
    const id = Number(userId);
    try {
      const user = await this.users.findById(id);
      this.logger.log(`streak requested for ${JSON.stringify(user)}`);
      return await this.service.streak(id);
    } catch (err) {
      this.logger.error(`streak failed: ${(err as Error).message}`);
      return { userId: id, count: 0, target: 10 };
    }
  }
}
