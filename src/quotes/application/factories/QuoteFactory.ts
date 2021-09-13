import { Quote } from '../contracts/Quote';
import { RawQuote } from '../contracts/RawQuote';

export class QuoteFactory {
  constructor(private rawQuote: RawQuote) {}

  public build(): Quote {
    return new Quote(this.rawQuote.uid, this.rawQuote.long_sentence);
  }
}
