import { VendingMachine } from "../VendingMachine";

export class MonetaryDevice {
  // static insertMoney(vendingMachine: VendingMachine, coin: string): Money {
  //   const money = Money.conversionCoinToMoney(coin);
  //   vendingMachine.addMoney(money.amount);
  //   return money;
  // }
}

const moneyMap: ReadonlyMap<string, number> = new Map([["100円", 100]]);

class Money {
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
