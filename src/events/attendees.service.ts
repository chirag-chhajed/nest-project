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
}
