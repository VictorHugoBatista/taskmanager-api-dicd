import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
