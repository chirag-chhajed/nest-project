// What is DTO?
// DTO is a data transfer object. It is an object that defines how the data will be sent over the network.
// DTO is a fancy name for defining the input properties and their types.
// Using types is beneficial to you and your team mates in the long run, because it makes the code more readable and maintainable, less error prone and easier to refactor.

import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDto {
    @IsString()
    @Length(5, 255, { message: 'Name must be at least 5 characters long' })
    name: string;
    @Length(5, 255)
    description: string;
    @IsDateString()
    when: Date;
    @Length(5, 255, { groups: ['create'] })
    @Length(10, 20, { groups: ['update'] })
    address: string;
}
