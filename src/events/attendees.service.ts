import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from './attendee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendeesService {
    constructor(
        @InjectRepository(Attendee)
        private readonly attendeesRepository: Repository<Attendee>,
    ) {}

    public async findByEventId(eventId: number): Promise<Attendee[]> {
        return await this.attendeesRepository.find({
            where: {
                event: {
                    id: eventId,
                },
            },
        });
    }

    public async findOneByEventIdAndUserId(
        eventId: number,
        userId: number,
    ): Promise<Attendee | undefined> {
        return await this.attendeesRepository.findOne({
            where: {
                event: {
                    id: eventId,
                },
                user: {
                    id: userId,
                },
            },
        });
    }

    public async createOrUpdate(
        input: any,
        eventId: number,
        userId: number,
    ): Promise<Attendee> {
        const attendee =
            (await this.findOneByEventIdAndUserId(eventId, userId)) ??
            new Attendee();

        attendee.eventId = eventId;
        attendee.userId = userId;
        attendee.answer = input.answer;

        return await this.attendeesRepository.save(attendee);
    }
}
