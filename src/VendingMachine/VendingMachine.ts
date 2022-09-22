import { Money } from "../Money";
import { Product } from "../Product";

export class VendingMachine {
  constructor(
    private readonly productList: Product[],
    private readonly amountOfMoney = new Money(0)
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

  private conversionCoinToMoney(coin: number): Money {
    return new Money(coin);
  }

  private isValidCoin(coin: number): boolean {
    if (coin !== 10 && coin !== 50 && coin !== 100 && coin !== 500) {
      return false;
    }
    return true;
  }

  insertMoney(coins: number[]): VendingMachine {
    const insertedMoneyAmount = coins.reduce<Money>(
      (prevMoney, currentCoin) => {
        if (!this.isValidCoin(currentCoin)) {
          throw new Error("使用不可能な貨幣が投入されました。");
        }

        const currentMoney = this.conversionCoinToMoney(currentCoin);
        return prevMoney.add(currentMoney);
      },
      new Money(0)
    );

    return new VendingMachine(
      this.productList,
      this.amountOfMoney.add(insertedMoneyAmount)
    );
  }

  private putOutChange(nextVendingMachine: VendingMachine): Money {
    return nextVendingMachine.amountOfMoney;
  }

  buyProduct(productName: string): {
    product: Product;
    nextVendingMachine: VendingMachine;
    change: Money;
  } {
    const product = this.findProductByName(productName);

    if (!this.canBuyProduct(product)) {
      throw new Error("投入金額が足りません。");
    }

    const nextAmountOfMoney = new Money(
      this.amountOfMoney.value - product.value
    );

    const nextVendingMachine = new VendingMachine(
      this.productList,
      nextAmountOfMoney
    );

    const change = this.putOutChange(nextVendingMachine);

    return {
      product,
      nextVendingMachine,
      change,
    };
  }

  isButtonLit(productName: string): boolean {
    const product = this.findProductByName(productName);

    return this.canBuyProduct(product);
  }

  repayment(): Money {
    return this.putOutChange(this);
  }
}
