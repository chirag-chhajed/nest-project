import { Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';

@Controller('school')
export class TrainingController {
    constructor(
        @InjectRepository(Subject)
        private readonly subjectRepository: Repository<Subject>,
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>,
    ) {}

    @Post('/create')
    public async savingRelation() {
        // const subject = new Subject();
        // subject.name = 'Math';

        const subject = await this.subjectRepository.findOne({
            where: { id: 1 },
        });

        // how to use one to one relation
        // const user = new User();
        // const profile = new Profile();

        // user.profile = profile;
        // user.profile = null;
        // Save the user here

        // const teacher1 = new Teacher();
        // teacher1.name = 'John Doe';

        // const teacher2 = new Teacher();
        // teacher2.name = 'Harry Doe';

        // subject.teachers = [teacher1, teacher2];
        // await this.teacherRepository.save([teacher1, teacher2]);

        const teacher1 = await this.teacherRepository.findOne({
            where: { id: 5 },
        });
        const teacher2 = await this.teacherRepository.findOne({
            where: { id: 6 },
        });
        if (!subject) {
            throw new Error('Subject not found.');
        }

        if (!teacher1) {
            throw new Error('Teacher 1 not found.');
        }

        if (!teacher2) {
            throw new Error('Teacher 2 not found.');
        }

        return await this.subjectRepository
            .createQueryBuilder()
            .relation(Subject, 'teachers')
            .of(subject)
            .add([teacher1, teacher2]);
    }

    @Post('/remove')
    public async removingRelation() {
        // const subject = await this.subjectRepository.findOne(
        //   1,
        //   { relations: ['teachers'] }
        // );

        // subject.teachers = subject.teachers.filter(
        //   teacher => teacher.id !== 2
        // );

        // await this.subjectRepository.save(subject);
        await this.subjectRepository
            .createQueryBuilder('s')
            .update()
            .set({ name: 'Confidential' })
            .execute();
    }
}
