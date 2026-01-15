import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { TimeEntriesService } from './time-entries.service';
import { CreateTimeEntryDto } from './create-time-entry.dto';
import type { TimeEntry } from './time-entry.interface';

@Controller('api/time-entries')
export class TimeEntriesController {
  constructor(private readonly timeEntriesService: TimeEntriesService) {}

  @Post()
  create(@Body() createTimeEntryDto: CreateTimeEntryDto): TimeEntry {
    try {
      return this.timeEntriesService.create(createTimeEntryDto);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(message);
    }
  }

  @Get()
  findAll(): TimeEntry[] {
    return this.timeEntriesService.findAll();
  }

  @Get('by-date')
  findByDate(@Query('date') date: string): TimeEntry[] {
    if (!date) {
      throw new BadRequestException('Date query parameter is required');
    }
    return this.timeEntriesService.findByDate(date);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { success: boolean } {
    return this.timeEntriesService.remove(parseInt(id, 10));
  }
}
