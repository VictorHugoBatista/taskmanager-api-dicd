import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { QuoteFactory } from '../factories/QuoteFactory';

@Injectable()
export class QuotesService {
  private baseUrl: string = 'https://random-data-api.com/api';

  constructor(private httpService: HttpService) {}

  public async random() {
    const rawQuote = await this.httpService.get(
      `${this.baseUrl}/lorem_ipsum/random_lorem_ipsum`,
    ).toPromise();
    return new QuoteFactory(rawQuote).build();
  }
}
