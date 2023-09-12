import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { AppJapanSercie } from './app.japan.service';
import { AppDummy } from './app.dummy';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { SchoolModule } from './school/school.module';
import { AuthModule } from './auth/auth.module';

// @injectable vs @Inject
// @injectable() is a decorator that marks a class as available to be injected as a dependency.
// @Inject() is a decorator that marks a constructor argument as available to be injected as a dependency.
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ormConfig],
            expandVariables: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory:
                process.env.NODE_ENV !== 'production'
                    ? ormConfig
                    : ormConfigProd,
        }),
        EventsModule,
        SchoolModule,
        AuthModule,
    ],
    controllers: [AppController],
    // all the types of providers below explanation
    // explain useClass, useValue, useFactory, useExisting
    // 1. useClass
    // useClass is used to provide a class as a dependency.
    // 2. useValue
    // useValue is used to provide a value as a dependency.
    // 3. useFactory
    // useFactory is used to provide a factory function as a dependency.
    // what is factory function? A factory function is a function that returns an instance of a dependency.
    // 4. useExisting

    providers: [
        {
            provide: AppService,
            useClass: AppJapanSercie,
        },
        {
            provide: 'APP_NAME',
            useValue: 'Nest Events',
        },
        {
            provide: 'MESSAGE',
            inject: [AppDummy],
            useFactory: (app) => `${app.dummy()} World!`,
        },
        AppDummy,
    ],
})
export class AppModule {}
