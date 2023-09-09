import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events/event.entity';
import { EventsModule } from './events/events.module';
import { AppJapanSercie } from './app.japan.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: '94justchaT.',
            database: 'events',
            entities: [Event],
            synchronize: true,
        }),
        EventsModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: AppService,
            useClass: AppJapanSercie,
        },
    ],
})
export class AppModule {}
