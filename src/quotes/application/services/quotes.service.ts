import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RawQuote } from '../contracts/RawQuote';

@Injectable()
export class QuotesService {
  private baseUrl: string = 'https://random-data-api.com/api';

  constructor(private httpService: HttpService) {}

  public random(): Observable<AxiosResponse<RawQuote>> {
    return this.httpService.get(
      `${this.baseUrl}/lorem_ipsum/random_lorem_ipsum`,
    );
  }
}
