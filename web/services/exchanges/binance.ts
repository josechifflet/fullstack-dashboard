import axios, { AxiosInstance } from 'axios';

import { CryptoData } from '../../components/Table/SymbolsTable';

export class BinanceExchange {
  private axiosInstance: AxiosInstance;
  private ws: WebSocket;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://fapi.binance.com',
    });

    this.ws = new WebSocket('wss://fstream.binance.com/ws');
  }

  public subscribeToTicker(
    symbol: string,
    onData: (data: CryptoData) => void
  ): void {
    this.ws.onopen = async () => {
      this.ws.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: [`${symbol.toLowerCase()}@ticker`],
          id: 1,
        })
      );

      const volumePercentageChange = await this.fetchVolumeData(symbol);
      onData({
        symbol,
        price: 0,
        pricePercentageChange: 0,
        volume: {
          USDT: 0,
          percentageChange: {
            '1min': volumePercentageChange['1min'],
            '15min': volumePercentageChange['15min'],
            '30min': volumePercentageChange['30min'],
            '1hr': volumePercentageChange['1hr'],
            '2hr': volumePercentageChange['2hr'],
            '4hr': volumePercentageChange['4hr'],
            '12hr': volumePercentageChange['12hr'],
            '24hr': volumePercentageChange['24hr'],
          },
        },
      });
    };

    this.ws.onmessage = async (event: MessageEvent) => {
      const parsedMessage = JSON.parse(event.data);
      if (parsedMessage.e === '24hrTickerEvent') {
        const volumePercentageChange = await this.fetchVolumeData(symbol);

        const cryptoData: CryptoData = {
          symbol,
          price: parseFloat(parsedMessage.c),
          pricePercentageChange: parseFloat(parsedMessage.P),
          volume: {
            USDT: parseFloat(parsedMessage.q),
            percentageChange: {
              '1min': volumePercentageChange['1min'],
              '15min': volumePercentageChange['15min'],
              '30min': volumePercentageChange['30min'],
              '1hr': volumePercentageChange['1hr'],
              '2hr': volumePercentageChange['2hr'],
              '4hr': volumePercentageChange['4hr'],
              '12hr': volumePercentageChange['12hr'],
              '24hr': volumePercentageChange['24hr'],
            },
          },
        };

        onData(cryptoData);
      }
    };
  }

  public closeWebSocket(): void {
    this.ws.close();
  }

  private async fetchVolumeData(
    symbol: string
  ): Promise<{ [key: string]: number }> {
    const intervals = ['1m', '3m', '15m', '30m', '1h', '2h', '4h', '12h', '1d'];
    const mappedIntervals = [
      '1min',
      '3min',
      '15min',
      '30min',
      '1hr',
      '2hr',
      '4hr',
      '12hr',
      '24hr',
    ];
    const volumePromises = intervals.map((interval) =>
      this.axiosInstance.get(
        `/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=2`
      )
    );
    const volumeResults = await Promise.all(volumePromises);

    const volumePercentageChange: { [key: string]: number } = {};
    for (let i = 0; i < intervals.length; i++) {
      const lastTwoKlines = volumeResults[i].data;
      const oldVolume = parseFloat(lastTwoKlines[0][7]);
      const newVolume = parseFloat(lastTwoKlines[1][7]);
      volumePercentageChange[mappedIntervals[i]] =
        ((newVolume - oldVolume) / oldVolume) * 100;
    }

    return volumePercentageChange;
  }
}
