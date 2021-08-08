import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    CommonModule,
    TaskModule,
    MongooseModule.forRoot('mongodb://user-taskmanager_api:123456@taskmanager-api-mongo:27017/taskmanager_api?authSource=taskmanager_api&readPreference=primary&appname=MongoDB%20Compass&ssl=false')
  ],
})
export class AppModule {}
