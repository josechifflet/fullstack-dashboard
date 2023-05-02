/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetSymbols {\n  symbols {\n    symbol\n  }\n}": types.GetSymbolsDocument,
    "query GetTraders($page: Float!, $take: Float!, $param: String) {\n  traders(page: $page, take: $take, param: $param) {\n    data {\n      ID\n    }\n    count\n    currentPage\n    lastPage\n    nextPage\n    prevPage\n  }\n}": types.GetTradersDocument,
    "subscription MarkPriceDataSubscription {\n  markPriceDataSubscription {\n    E\n    P\n    T\n    e\n    i\n    p\n    r\n    s\n  }\n}": types.MarkPriceDataSubscriptionDocument,
    "subscription SymbolsDataSubscription {\n  symbolsDataSubscription {\n    interval\n    symbol\n    tradeAmount\n    tradePctgChange\n    volume\n    volumePctgChange\n  }\n}": types.SymbolsDataSubscriptionDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetSymbols {\n  symbols {\n    symbol\n  }\n}"): (typeof documents)["query GetSymbols {\n  symbols {\n    symbol\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetTraders($page: Float!, $take: Float!, $param: String) {\n  traders(page: $page, take: $take, param: $param) {\n    data {\n      ID\n    }\n    count\n    currentPage\n    lastPage\n    nextPage\n    prevPage\n  }\n}"): (typeof documents)["query GetTraders($page: Float!, $take: Float!, $param: String) {\n  traders(page: $page, take: $take, param: $param) {\n    data {\n      ID\n    }\n    count\n    currentPage\n    lastPage\n    nextPage\n    prevPage\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "subscription MarkPriceDataSubscription {\n  markPriceDataSubscription {\n    E\n    P\n    T\n    e\n    i\n    p\n    r\n    s\n  }\n}"): (typeof documents)["subscription MarkPriceDataSubscription {\n  markPriceDataSubscription {\n    E\n    P\n    T\n    e\n    i\n    p\n    r\n    s\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "subscription SymbolsDataSubscription {\n  symbolsDataSubscription {\n    interval\n    symbol\n    tradeAmount\n    tradePctgChange\n    volume\n    volumePctgChange\n  }\n}"): (typeof documents)["subscription SymbolsDataSubscription {\n  symbolsDataSubscription {\n    interval\n    symbol\n    tradeAmount\n    tradePctgChange\n    volume\n    volumePctgChange\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;