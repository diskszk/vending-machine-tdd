export class Money {
  // coinがどこからも参照されていない
  constructor(private readonly coin: string, readonly value: number) {}
}

export class MoneyMap {
  static getMoneyMap(): ReadonlyMap<string, number> {
    return new Map([
      ["10円", 10],
      ["50円", 50],
      ["100円", 100],
      ["500円", 500],
    ]);
  }
}
