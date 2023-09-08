// What is DTO?
// DTO is a data transfer object. It is an object that defines how the data will be sent over the network.
// DTO is a fancy name for defining the input properties and their types.
// Using types is beneficial to you and your team mates in the long run, because it makes the code more readable and maintainable, less error prone and easier to refactor.
export class CreateEventDto {
    name: string;
    description: string;
    when: Date;
    address: string;
}
