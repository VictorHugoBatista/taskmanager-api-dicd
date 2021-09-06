import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class QuotesService {
  private baseUrl: string = 'https://random-data-api.com/api';

  constructor(private httpService: HttpService) {}

  public random() {
    const quote = this.httpService.get(
      `${this.baseUrl}/lorem_ipsum/random_lorem_ipsum`,
    );
    return quote;
  }
}
