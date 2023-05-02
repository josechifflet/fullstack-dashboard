import WebSocket from 'ws';

import { pubSub } from './core/apollo/server';
import App from './core/express/app';
import { db } from './db';
import log from './util/tslog';

function paginateArray<T>(
  array: T[],
  page_size: number,
  page_number: number
): T[] {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

interface KlinePayload {
  e: string;
  E: number;
  s: string;
  k: {
    t: number;
    T: number;
    s: string;
    i: string;
    f: number;
    L: number;
    o: string;
    c: string;
    h: string;
    l: string;
    v: string;
    n: number;
    x: boolean;
    q: string;
    V: string;
    Q: string;
    B: string;
  };
}

interface MarkPriceUpdateEventPayload {
  e: string;
  E: number;
  s: string;
  p: string;
  i: string;
  P: string;
  r: string;
  T: number;
}

interface KlineData {
  symbol: string;
  interval: string;
  volume: number;
  tradeAmount: number;
}

const timeframes = ['1m', '5m', '15m', '1h', '4h', '12h', '1d', '3d', '1w'];

const klineData: Map<string, KlineData> = new Map();
const data: Map<string, string> = new Map();

async function processKlinePayload(payload: KlinePayload) {
  const k = payload.k;
  const symbol = payload.s;
  const interval = k.i;

  const volume = parseFloat(k.v);
  const tradeAmount = k.n;

  const previousData = klineData.get(`${symbol}_${interval}`);
  if (
    previousData &&
    previousData.volume !== volume &&
    previousData.tradeAmount !== tradeAmount
  ) {
    const volumeDifference = calculatePercentageDifference(
      volume,
      previousData.volume
    );
    const tradeAmountDifference = calculatePercentageDifference(
      tradeAmount,
      previousData.tradeAmount
    );

    data.set(`${symbol}_${interval}_volume`, volumeDifference);
    data.set(`${symbol}_${interval}_tradeAmount`, tradeAmountDifference);

    await db.repositories.volumeTable.update(
      { symbol },
      {
        volumeUSDT: volume,
        [`volumePcgChange${interval}`]: volumeDifference,
        [`tradeAmountPcgChange${interval}`]: tradeAmountDifference,
      }
    );
  }

  klineData.set(`${symbol}_${interval}`, {
    symbol,
    interval,
    volume,
    tradeAmount,
  });
}

async function processMarkPricePayload(payload: MarkPriceUpdateEventPayload) {
  await db.repositories.volumeTable.update(
    { symbol: payload.s },
    { price: +payload.p }
  );
  return payload;
}

function calculatePercentageDifference(
  current: number,
  previous: number
): string {
  return (((current - previous) / previous) * 100).toFixed(2);
}

function startKlineStream(symbols: string[], intervals: string[]) {
  // paginate the symbol array into pages of size 10 and for each page open a socket connection
  // to binance and subscribe to the kline stream for each symbol in the page

  for (let i = 1; paginateArray<string>(symbols, 5, i).length > 0; i += 1) {
    const pageSymbols = paginateArray<string>(symbols, 5, i);

    let streamsString = '';
    for (const page of pageSymbols) {
      for (const interval of intervals) {
        streamsString += `${page.toLowerCase()}@kline_${interval}/`;
      }
    }

    for (const page of pageSymbols) {
      streamsString += `${page.toLowerCase()}@markPrice/`;
    }

    // delete the last "/"
    streamsString = streamsString.slice(0, -1);

    const ws = new WebSocket(
      `wss://fstream.binance.com/stream?streams=${streamsString}`
    );

    ws.on('message', (data: string) => {
      try {
        const payload = JSON.parse(data);
        if (payload.stream.endsWith('@markPrice')) {
          processMarkPricePayload(payload.data);
        } else {
          processKlinePayload(payload.data);
        }
      } catch (err) {
        console.error(err);
      }
    });

    ws.on('error', (error) => {
      console.error(`WebSocket error:`, error);
    });
  }
}

(async () => {
  try {
    await App();

    const symbols = await db.repositories.symbol.find();

    startKlineStream(
      // alphabetically sort the symbols
      symbols.map(({ symbol }) => symbol).sort((a, b) => a.localeCompare(b)),
      timeframes
    );
  } catch (err) {
    log.error(`Exec file error: ${err}`);
  }
})();
