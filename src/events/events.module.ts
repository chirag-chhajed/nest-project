import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventsController } from './events.controller';
import { Attendee } from './attendee.entity';
import { EventsService } from './events.service';
import { AttendeesService } from './attendees.service'; // Modules are Singleton
import { EventAttendessController } from './event-attendess.controller';
import { EventsOrganizedByUserController } from './events-organized-by-user/events-organized-by-user.controller';
import { CurrentUserEventAttendanceController } from './current-user-event-attendance/current-user-event-attendance.controller';
// Modules are singletons by default. Even when modules are imported multiple times,
@Module({
    imports: [TypeOrmModule.forFeature([Event, Attendee])],
    controllers: [
        EventsController,
        EventAttendessController,
        EventsOrganizedByUserController,
        CurrentUserEventAttendanceController,
    ],
    providers: [EventsService, AttendeesService],
})
export class EventsModule {}
