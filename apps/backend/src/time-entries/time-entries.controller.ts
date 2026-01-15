import { Controller, Get, Post, Body, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { TimeEntriesService } from './time-entries.service';
import { CreateTimeEntryDto } from './create-time-entry.dto';
import { TimeEntry } from './time-entry.interface';

@Controller('api/time-entries')
export class TimeEntriesController {
  constructor(private readonly timeEntriesService: TimeEntriesService) {}

  @Post()
  async create(@Body() createTimeEntryDto: CreateTimeEntryDto): Promise<TimeEntry> {
    try {
      return await this.timeEntriesService.create(createTimeEntryDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(): Promise<TimeEntry[]> {
    return await this.timeEntriesService.findAll();
  }

  @Get('by-date')
  async findByDate(@Query('date') date: string): Promise<TimeEntry[]> {
    if (!date) {
      throw new BadRequestException('Date query parameter is required');
    }
    return await this.timeEntriesService.findByDate(date);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.timeEntriesService.remove(parseInt(id, 10));
  }
}
