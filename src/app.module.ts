import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    CommonModule,
    TaskModule,
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
  ],
})
export class AppModule {}
