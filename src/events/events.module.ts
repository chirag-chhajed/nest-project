import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventsController } from './events.controller';
// Modules are Singleton
// Modules are singletons by default. Even when modules are imported multiple times,
@Module({
    imports: [TypeOrmModule.forFeature([Event])],
    controllers: [EventsController],
})
export class EventsModule {}
