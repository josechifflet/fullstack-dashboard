import WebSocket from 'ws';

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

interface KlineData {
  symbol: string;
  interval: string;
  volume: number;
  tradeAmount: number;
}

const timeframes = [
  '1m',
  '3m',
  '5m',
  '15m',
  '30m',
  '1h',
  '2h',
  '4h',
  '6h',
  '8h',
  '12h',
  '1d',
  '3d',
  '1w',
  '1M',
];

const symbols = ['BTCUSDT', 'ETHUSDT' /* Add other symbols here */];

const klineData: Map<string, KlineData> = new Map();

function processKlinePayload(payload: KlinePayload) {
  const k = payload.k;
  const symbol = payload.s;
  const interval = k.i;

  const volume = parseFloat(k.v);
  const tradeAmount = k.n;

  klineData.set(`${symbol}_${interval}`, {
    symbol,
    interval,
    volume,
    tradeAmount,
  });
}

// Worker function to handle a single WebSocket connection
async function handleWebSocketConnection(
  symbol: string,
  interval: string
): Promise<void> {
  return new Promise((resolve) => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
    );

    ws.on('message', (data: string) => {
      const payload = JSON.parse(data.toString());
      processKlinePayload(payload);
    });

    ws.on('close', () => {
      resolve();
    });
  });
}

// Export the worker function
export default handleWebSocketConnection;
