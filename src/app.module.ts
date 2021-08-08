import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [CommonModule, TaskModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
