import { TimeEntriesService } from './time-entries.service';
import { CreateTimeEntryDto } from './create-time-entry.dto';
import { TimeEntry } from './time-entry.interface';
export declare class TimeEntriesController {
    private readonly timeEntriesService;
    constructor(timeEntriesService: TimeEntriesService);
    create(createTimeEntryDto: CreateTimeEntryDto): Promise<TimeEntry>;
    findAll(): Promise<TimeEntry[]>;
    findByDate(date: string): Promise<TimeEntry[]>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
