import { Query, Resolver, Root, Subscription } from 'type-graphql';

import { db } from '../db';
import { Symbol } from '../db/models/symbol.model';
import { MarkPriceUpdate, SymbolTradeData } from '../types/typeDefs';

@Resolver()
export class SymbolResolver {
  @Query(() => [Symbol])
  async symbols() {
    const symbols = await db.repositories.symbol.find();
    return symbols;
  }

  @Subscription({ topics: 'SymbolsMarkPrice' })
  markPriceDataSubscription(
    @Root()
    markPrice: MarkPriceUpdate
  ): MarkPriceUpdate {
    return markPrice;
  }

  @Subscription({ topics: 'SymbolsData' })
  symbolsDataSubscription(
    @Root()
    symbolData: SymbolTradeData
  ): SymbolTradeData {
    return symbolData;
  }
}
