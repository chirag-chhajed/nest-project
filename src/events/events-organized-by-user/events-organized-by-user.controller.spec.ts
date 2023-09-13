import { Test, TestingModule } from '@nestjs/testing';
import { EventsOrganizedByUserController } from './events-organized-by-user.controller';

describe('EventsOrganizedByUserController', () => {
    let controller: EventsOrganizedByUserController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EventsOrganizedByUserController],
        }).compile();

        controller = module.get<EventsOrganizedByUserController>(
            EventsOrganizedByUserController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
