import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PersonService, PersonResolver],
})
export class PersonModule {}