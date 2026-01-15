import { CreateTimeEntryDto } from './create-time-entry.dto';
import { TimeEntry } from './time-entry.interface';
export declare class TimeEntriesService {
    constructor();
    create(createTimeEntryDto: CreateTimeEntryDto): Promise<TimeEntry>;
    findAll(): Promise<TimeEntry[]>;
    findById(id: number): Promise<TimeEntry>;
    findByDate(date: string): Promise<TimeEntry[]>;
    remove(id: number): Promise<{
        success: boolean;
    }>;
}
