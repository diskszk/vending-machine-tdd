import { Money } from "../Money";
import { Product } from "../Product";

export class VendingMachine {
  constructor(
    private readonly productList: Product[],
    private amountOfMoney = new Money(0)
  ) {}

  private canBuyProduct(product: Product): boolean {
    return this.amountOfMoney.value >= product.value;
  }

  private findProductByName(productName: string): Product {
    const product = this.productList.find(
      (product) => product.name === productName
    );

    if (!product) {
      throw new Error("指定された商品は存在しません。");
    }

    return product;
  }

  private isValidCoin(coin: number): void {
    if (coin !== 10 && coin !== 50 && coin !== 100 && coin !== 500) {
      throw new Error("使用不可能な貨幣が投入されました。");
    }

    return;
  }

  insertCoins(coins: number[]): void {
    const insertedTotalMoneyAmount = coins.reduce((total, current) => {
      this.isValidCoin(current);
      return (total += current);
    }, 0);

    this.amountOfMoney = new Money(
      this.amountOfMoney.value + insertedTotalMoneyAmount
    );
  }

  buyProduct(productName: string): Product {
    const product = this.findProductByName(productName);

    if (!this.canBuyProduct(product)) {
      throw new Error("投入金額が足りません。");
    }
    this.amountOfMoney = new Money(this.amountOfMoney.value - product.value);

    return product;
  }

  isButtonLit(productName: string): boolean {
    const product = this.findProductByName(productName);

    return this.canBuyProduct(product);
  }

  repay(): Money {
    return this.amountOfMoney;
  }
}
