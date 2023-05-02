import { gql } from './__generated__';

export const GET_TRADERS_PAGINATED =
  gql(`query GetTraders($page: Float!, $take: Float!, $param: String) {
  traders(page: $page, take: $take, param: $param) {
    data {
      ID
    }
    count
    currentPage
    lastPage
    nextPage
    prevPage
  }
}`);

export const GET_SYMBOLS = gql(`query GetSymbols {
  symbols {
    symbol
  }
}`);

export const SYMBOLS_DATA_SUBSCRIPTION =
  gql(`subscription SymbolsDataSubscription {
  symbolsDataSubscription {
    interval
    symbol
    tradeAmount
    tradePctgChange
    volume
    volumePctgChange
  }
}`);

export const MARK_PRICE_DATA_SUBSCRIPTION =
  gql(`subscription MarkPriceDataSubscription {
  markPriceDataSubscription {
    E
    P
    T
    e
    i
    p
    r
    s
  }
}`);
