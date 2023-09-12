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
} from '@nestjs/common';
import { CreateEventDto } from './input/create-event.dto';
import { UpdateEventDto } from './input/update-event.dto';
import { Event } from './event.entity';
import { MoreThan, Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from './attendee.entity';
import { EventsService } from './events.service';
import { ListEvents } from './input/list.events';

@Controller('/events')
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
    @Get('/practice')
    async practice() {
        return await this.repository.find({
            where: [
                {
                    id: MoreThan(3),
                    when: MoreThan(new Date('2020-05-01')),
                    description: Like('%meet%'),
                },
            ],
            take: 2,
            order: {
                id: 'DESC',
            },
        });
    }

    @Get('/practice2')
    async practice2() {
        // return await this.repository.findOne({
        //     where: { id: 2 },
        //     loadEagerRelations: false,
        // });
        const event = await this.repository.findOne({
            where: { id: 1 },
        });
        const attendee = new Attendee();
        attendee.name = 'Jerry';
        attendee.event = event;
        await this.attendeeRepository.save(attendee);
        return attendee;
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        // console.log(typeof id);
        // wrap this in try catch block
        // try {
        //     const event = await this.repository.findOneBy({ id });
        //     return event;
        // } catch (e) {
        //     throw new NotFoundException();
        // }
        // what is async wrapper? it is a function that takes a function and returns a function that returns a promise that resolves to the return value of the original function
        const event = await this.eventsService.getEvent(id);
        if (!event) {
            throw new NotFoundException();
        }
        return event;
    }

    @Post()
    async create(
        @Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDto,
    ) {
        return await this.repository.save({
            ...input,
            when: new Date(input.when),
        });
    }

    @Patch(':id')
    async update(
        @Param('id') id,
        @Body(new ValidationPipe({ groups: ['create'] })) input: UpdateEventDto,
    ) {
        const event = await this.repository.findOneBy({ id });
        return await this.repository.save({
            ...event,
            ...input,
            when: input.when ? new Date(input.when) : event.when,
        });
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) {
        const result = await this.eventsService.deleteEvent(id);
        if (result?.affected !== 1) {
            throw new NotFoundException();
        }
    }
}

// nestjs preserve watch output flag?
