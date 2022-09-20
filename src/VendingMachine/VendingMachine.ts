import { Product } from "../Product";

export class VendingMachine {
  constructor(
    private readonly productList: Product[],
    private readonly amountOfMoney = 0
  ) {}

  insertMoney(money: number): VendingMachine {
    if (money !== 100) {
      throw new Error("100円コイン以外は投入できません。");
    }
    return new VendingMachine(this.productList, this.amountOfMoney + money);
  }

  getAmountOfMoney(): number {
    return this.amountOfMoney;
  }

  private canBuyProduct(product: Product): boolean {
    return this.getAmountOfMoney() >= product.value;
  }

  buyProduct(productName: string): Product {
    const findResult = this.productList.find(
      ({ name }) => name === productName
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
