import { Money, MoneyMap } from "../Money";
import { Product } from "../Product";

export class VendingMachine {
  constructor(
    private readonly productList: Product[],
    private readonly amountOfMoney = 0
  ) {}

  private canBuyProduct(product: Product): boolean {
    return this.amountOfMoney >= product.value;
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

  private conversionCoinToMoney(coin: string): Money {
    const moneyMap = MoneyMap.getMoneyMap();
    const value = moneyMap.get(coin);

    if (!value) {
      throw new Error("使用不可能な貨幣が投入されました。");
    }

    return new Money(coin, value);
  }

  insertMoney(coins: string[]): VendingMachine {
    const totalAmount = coins.reduce<number>((prev, current) => {
      const money = this.conversionCoinToMoney(current);
      return prev + money.value;
    }, 0);

    return new VendingMachine(
      this.productList,
      this.amountOfMoney + totalAmount
    );
  }

  buyProduct(productName: string): Product {
    const product = this.findProductByName(productName);

    if (!this.canBuyProduct(product)) {
      throw new Error("投入金額が足りません。");
    }

    return product;
  }

  isButtonLit(productName: string): boolean {
    const product = this.findProductByName(productName);

    return this.canBuyProduct(product);
  }
}
