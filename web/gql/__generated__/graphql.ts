/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type MarkPriceUpdate = {
  E: Scalars['Float'];
  P: Scalars['String'];
  T: Scalars['Float'];
  e: Scalars['String'];
  i: Scalars['String'];
  p: Scalars['String'];
  r: Scalars['String'];
  s: Scalars['String'];
};

export type PaginatedTraderResponse = {
  count: Scalars['Int'];
  currentPage: Scalars['Int'];
  data: Array<Trader>;
  lastPage: Scalars['Int'];
  nextPage?: Maybe<Scalars['Int']>;
  prevPage?: Maybe<Scalars['Int']>;
};

export type Query = {
  getCacheByKey?: Maybe<Scalars['String']>;
  symbols: Array<Symbol>;
  traders: PaginatedTraderResponse;
};


export type QueryGetCacheByKeyArgs = {
  key: Scalars['String'];
  time: Scalars['Float'];
};


export type QueryTradersArgs = {
  page: Scalars['Float'];
  param?: InputMaybe<Scalars['String']>;
  take: Scalars['Float'];
};

export type Subscription = {
  markPriceDataSubscription: MarkPriceUpdate;
  symbolsDataSubscription: SymbolTradeData;
};

export type Symbol = {
  ID: Scalars['String'];
  PK: Scalars['ID'];
  symbol: Scalars['String'];
};

export type SymbolTradeData = {
  interval: Scalars['String'];
  symbol: Scalars['String'];
  tradeAmount: Scalars['Float'];
  tradePctgChange: Scalars['Float'];
  volume: Scalars['Float'];
  volumePctgChange: Scalars['Float'];
};

export type Trader = {
  ID: Scalars['String'];
  PK: Scalars['ID'];
  encryptedUid: Scalars['String'];
  followerCount: Scalars['Float'];
  futureUid?: Maybe<Scalars['String']>;
  isTwTrader?: Maybe<Scalars['Boolean']>;
  nickName?: Maybe<Scalars['String']>;
  openId?: Maybe<Scalars['String']>;
  pnl: Scalars['Float'];
  positionShared: Scalars['Boolean'];
  rank: Scalars['Float'];
  roi: Scalars['Float'];
  tradeType?: Maybe<Scalars['String']>;
  twShared?: Maybe<Scalars['String']>;
  twitterUrl?: Maybe<Scalars['String']>;
  updateTime: Scalars['String'];
  userPhotoUrl?: Maybe<Scalars['String']>;
};

export type GetSymbolsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSymbolsQuery = { symbols: Array<{ symbol: string }> };

export type GetTradersQueryVariables = Exact<{
  page: Scalars['Float'];
  take: Scalars['Float'];
  param?: InputMaybe<Scalars['String']>;
}>;


export type GetTradersQuery = { traders: { count: number, currentPage: number, lastPage: number, nextPage?: number | null, prevPage?: number | null, data: Array<{ ID: string }> } };

export type MarkPriceDataSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MarkPriceDataSubscriptionSubscription = { markPriceDataSubscription: { E: number, P: string, T: number, e: string, i: string, p: string, r: string, s: string } };

export type SymbolsDataSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SymbolsDataSubscriptionSubscription = { symbolsDataSubscription: { interval: string, symbol: string, tradeAmount: number, tradePctgChange: number, volume: number, volumePctgChange: number } };


export const GetSymbolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSymbols"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbols"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]} as unknown as DocumentNode<GetSymbolsQuery, GetSymbolsQueryVariables>;
export const GetTradersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTraders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"traders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"nextPage"}},{"kind":"Field","name":{"kind":"Name","value":"prevPage"}}]}}]}}]} as unknown as DocumentNode<GetTradersQuery, GetTradersQueryVariables>;
export const MarkPriceDataSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MarkPriceDataSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markPriceDataSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"E"}},{"kind":"Field","name":{"kind":"Name","value":"P"}},{"kind":"Field","name":{"kind":"Name","value":"T"}},{"kind":"Field","name":{"kind":"Name","value":"e"}},{"kind":"Field","name":{"kind":"Name","value":"i"}},{"kind":"Field","name":{"kind":"Name","value":"p"}},{"kind":"Field","name":{"kind":"Name","value":"r"}},{"kind":"Field","name":{"kind":"Name","value":"s"}}]}}]}}]} as unknown as DocumentNode<MarkPriceDataSubscriptionSubscription, MarkPriceDataSubscriptionSubscriptionVariables>;
export const SymbolsDataSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"SymbolsDataSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbolsDataSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"tradeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"tradePctgChange"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"volumePctgChange"}}]}}]}}]} as unknown as DocumentNode<SymbolsDataSubscriptionSubscription, SymbolsDataSubscriptionSubscriptionVariables>;