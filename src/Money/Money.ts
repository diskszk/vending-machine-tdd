const moneyMap: ReadonlyMap<string, number> = new Map([["100円", 100]]);

export class Money {
  constructor(readonly coin: string, readonly amount: number) {}

  static conversionCoinToMoney(coin: string) {
    const amount = moneyMap.get(coin);

    if (!amount) {
      throw new Error("100円コイン以外は投入できません。");
    }

    return {
      coin,
      amount,
    };
  }
}
