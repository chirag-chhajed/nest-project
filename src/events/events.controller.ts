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
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';
import { MoreThan, Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/events')
export class EventsController {
    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>,
    ) {}

    @Get()
    async findAll() {
        return await this.repository.find();
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

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        console.log(typeof id);
        return await this.repository.findOneBy({
            id,
        });
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
        const event = await this.repository.findOneBy({ id });
        await this.repository.remove(event);
    }
}
