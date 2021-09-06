import { Quote } from  '../contracts/Quote';
export class QuoteFactory {
  constructor(private rawQuote) {}

  public build(): Quote {
    return new Quote(
      this.rawQuote.data.uid,
      this.rawQuote.data.long_sentence,
    );
  }
}
