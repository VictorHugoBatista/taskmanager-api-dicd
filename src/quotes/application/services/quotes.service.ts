import { Injectable } from '@nestjs/common';

@Injectable()
export class QuotesService {
  public random() {
    return {quote: 'quote'};
  }
}
