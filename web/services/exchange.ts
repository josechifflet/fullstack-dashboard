// services/Exchange.ts
import { CryptoData } from '../components/Table/SymbolsTable';

export abstract class Exchange {
  protected ws: WebSocket;

  constructor(webSocketUrl: string) {
    this.ws = new WebSocket(webSocketUrl);
  }

  public abstract subscribeToTicker(
    symbol: string,
    onData: (data: CryptoData) => void
  ): void;

  public abstract closeWebSocket(): void;
}
