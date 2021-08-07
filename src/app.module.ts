import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { databaseProviders } from './common/database/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
  imports: [CommonModule],
})
export class AppModule {}
