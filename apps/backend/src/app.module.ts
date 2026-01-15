import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeEntriesModule } from './time-entries/time-entries.module';

@Module({
  imports: [TimeEntriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
