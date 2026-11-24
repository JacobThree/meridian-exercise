import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CheckInsService } from './checkins.service';

class RecordCheckInDto {
  localDate: string; // YYYY-MM-DD, computed on the phone
  mindScore?: number;
}

@Controller('checkins')
@UseGuards(JwtAuthGuard)
export class CheckInsController {
  constructor(private readonly service: CheckInsService) {}

  @Post()
  record(@Req() req: { user: { id: number } }, @Body() dto: RecordCheckInDto) {
    return this.service.record(req.user.id, dto.localDate, dto.mindScore ?? null);
  }

  @Get('history')
  history(@Req() req: { user: { id: number } }, @Query('days') days?: string) {
    return this.service.history(req.user.id, days ? Number(days) : 30);
  }
}
