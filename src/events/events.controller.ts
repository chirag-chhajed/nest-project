import {
    Controller,
    Get,
    Patch,
    Post,
    Delete,
    Param,
    Body,
    HttpCode,
    ValidationPipe,
    ParseIntPipe,
    Logger,
    NotFoundException,
    Query,
    UsePipes,
    UseGuards,
    ForbiddenException,
    SerializeOptions,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateEventDto } from './input/create-event.dto';
import { UpdateEventDto } from './input/update-event.dto';
import { Event } from './event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from './attendee.entity';
import { EventsService } from './events.service';
import { ListEvents } from './input/list.events';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuardJwt } from 'src/auth/auth-guard.jwt';

@Controller('/events')
@SerializeOptions({ strategy: 'excludeAll' })
export class EventsController {
    private readonly logger = new Logger(EventsController.name);
    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>,
        @InjectRepository(Attendee)
        private readonly attendeeRepository: Repository<Attendee>,
        private readonly eventsService: EventsService,
    ) {}

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(@Query() filter: ListEvents) {
        this.logger.debug(filter.page);
        this.logger.log('Hit the findAll route');
        const events =
            await this.eventsService.getEventsWithAttendeeCountFilteredPaginated(
                filter,
                {
                    total: true,
                    currentPage: filter.page,
                    limit: 2,
                },
            );
        // this.logger.debug(`Found ${events.length} events`);
        return events;
    }

    // @Param() gives the whole params object and @Param('id') gives the id property of the params object
    // @Get('/practice')
    // async practice() {
    //     return await this.repository.find({
    //         where: [
    //             {
    //                 id: MoreThan(3),
    //                 when: MoreThan(new Date('2020-05-01')),
    //                 description: Like('%meet%'),
    //             },
    //         ],
    //         take: 2,
    //         order: {
    //             id: 'DESC',
    //         },
    //     });
    // }

    // @Get('/practice2')
    // async practice2() {
    //     // return await this.repository.findOne({
    //     //     where: { id: 2 },
    //     //     loadEagerRelations: false,
    //     // });
    //     const event = await this.repository.findOne({
    //         where: { id: 1 },
    //     });
    //     const attendee = new Attendee();
    //     attendee.name = 'Jerry';
    //     attendee.event = event;
    //     await this.attendeeRepository.save(attendee);
    //     return attendee;
    // }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        // what is async wrapper? it is a function that takes a function and returns a function that returns a promise that resolves to the return value of the original function
        const event = await this.eventsService.getEvent(id);
        if (!event) {
            throw new NotFoundException();
        }
        return event;
    }

    @Post()
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() input: CreateEventDto, @CurrentUser() user: User) {
        return await this.eventsService.createEvent(input, user);
    }

    @Patch(':id')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async update(
        @Param('id') id,
        @Body(new ValidationPipe({ groups: ['create'] })) input: UpdateEventDto,
        @CurrentUser() user: User,
    ) {
        const event = await this.repository.findOneBy({ id });
        if (!event) throw new NotFoundException();

        if (event.organizerId !== user.id) {
            throw new ForbiddenException(
                null,
                `You are not authorized to change this event`,
            );
        }
        return await this.eventsService.updateEvent(event, input);
    }

    @Delete(':id')
    @UseGuards(AuthGuardJwt)
    @HttpCode(204)
    async remove(@Param('id') id, @CurrentUser() user: User) {
        const event = await this.eventsService.getEvent(id);
        if (!event) throw new NotFoundException();

        if (event.organizerId !== user.id) {
            throw new ForbiddenException(
                null,
                `You are not authorized to remove this event`,
            );
        }

        await this.eventsService.deleteEvent(id);
    }
}

// nestjs preserve watch output flag?
