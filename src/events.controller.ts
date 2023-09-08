import {
    Controller,
    Get,
    Patch,
    Post,
    Delete,
    Param,
    Body,
    HttpCode,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';

@Controller('/events')
export class EventsController {
    private events: Event[] = [];

    @Get()
    findAll() {
        return this.events;
    }

    // @Param() gives the whole params object and @Param('id') gives the id property of the params object

    @Get(':id')
    findOne(@Param('id') id) {
        const event = this.events.find((event) => event.id === Number(id));
        return event;
    }

    @Post()
    create(@Body() input: CreateEventDto) {
        const event = {
            ...input,
            when: new Date(input.when),
            id: this.events.length + 1,
        };
        this.events.push(event);
        return event;
    }

    @Patch(':id')
    update(@Param('id') id, @Body() input: UpdateEventDto) {
        const index = this.events.findIndex((event) => event.id === Number(id));
        this.events[index] = {
            ...this.events[index],
            ...input,
            when: input.when ? new Date(input.when) : this.events[index].when,
        };
        return this.events[index];
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id) {
        this.events = this.events.filter((event) => event.id !== Number(id));
    }
}
