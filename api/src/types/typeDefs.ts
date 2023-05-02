import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class SymbolTradeData {
  @Field()
  symbol: string;

  @Field()
  interval: string;

  @Field()
  volume: number;

  @Field()
  tradeAmount: number;

  @Field()
  volumePctgChange: number;

  @Field()
  tradePctgChange: number;
}

@ObjectType()
export class MarkPriceUpdate {
  @Field()
  e: string;

  @Field()
  E: number;

  @Field()
  s: string;

  @Field()
  p: string;

  @Field()
  i: string;

  @Field()
  P: string;

  @Field()
  r: string;

  @Field()
  T: number;
}
