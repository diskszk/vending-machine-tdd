const moneyMap: ReadonlyMap<string, number> = new Map([
  ["10円", 10],
  ["50円", 50],
  ["100円", 100],
  ["500円", 500],
]);

class Money {
  // coinがどこからも参照されていない
  constructor(private readonly coin: string, private readonly value: number) {}

  getValue(): number {
    return this.value;
  }
}

export class MonetaryDevice {
  conversionCoinToMoney(coin: string): Money {
    const value = moneyMap.get(coin);

    if (!value) {
      throw new Error("使用不可能な貨幣が投入されました。");
    }

    return new Money(coin, value);
  }
}
