import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeEntriesModule } from './time-entries/time-entries.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [TimeEntriesModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
