import { Money } from "../Money/Money";
import { Product } from "../Product";

export class VendingMachine {
  constructor(
    private readonly productList: Product[],
    private readonly amountOfMoney = 0
  ) {}

  insertMoney(coins: string[]): VendingMachine {
    const totalAmount = coins.reduce<number>((prev, current) => {
      const money = Money.conversionCoinToMoney(current);
      return prev + money.amount;
    }, 0);

    return new VendingMachine(
      this.productList,
      this.amountOfMoney + totalAmount
    );
  }

  private canBuyProduct(product: Product): boolean {
    return this.amountOfMoney >= product.getValue();
  }

  buyProduct(productName: string): Product {
    const findResult = this.productList.find(
      (product) => product.getName() === productName
    );
    if (!findResult) {
      throw new Error("購入できません");
    }

    if (!this.canBuyProduct(findResult)) {
      throw new Error("投入金額が足りません。");
    }

    return findResult;
  }
}
