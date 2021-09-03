import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('quotes')
export class QuotesController {
  @Get('/random')
  @ApiOperation({ summary: 'Returns a random quote by calling the Shakespare API' })
  @ApiTags('Quotes')
  public random() {
    return {random: 'quote'};
  }
}
