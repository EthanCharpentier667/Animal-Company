import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './animal.entity';
import { AnimalService } from './animal.service';
import { AnimalResolver } from './animal.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  providers: [AnimalService, AnimalResolver],
})
export class AnimalModule {}