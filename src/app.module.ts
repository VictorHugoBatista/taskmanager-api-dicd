import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { TaskModule } from './task/task.module';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [
    CommonModule,
    TaskModule,
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    QuotesModule,
  ],
})
export class AppModule {}
