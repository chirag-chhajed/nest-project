import { Event } from './event.entity';

test('Event should be initialized through constructor', () => {
    const event = new Event({
        name: 'Interesting event',
        description: 'This is a very interesting event',
        id: undefined,
        when: undefined,
        address: undefined,
        attendees: undefined,
        organizer: undefined,
        organizerId: undefined,
        attendeeCount: undefined,
        attendeeAccepted: undefined,
        attendeeMaybe: undefined,
        attendeeRejected: undefined,
    });
    expect(event).toEqual({
        name: 'Interesting event',
        description: 'This is a very interesting event',
        id: undefined,
        when: undefined,
        address: undefined,
        attendees: undefined,
        organizer: undefined,
        organizerId: undefined,
        attendeeCount: undefined,
        attendeeAccepted: undefined,
        attendeeMaybe: undefined,
        attendeeRejected: undefined,
    });
});
