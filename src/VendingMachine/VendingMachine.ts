import { Money } from "../Money/Money";
import { Product } from "../Product";

export class VendingMachine {
  constructor(
    private readonly productList: Product[],
    private readonly amountOfMoney = 0
  ) {}

  private canBuyProduct(product: Product): boolean {
    return this.amountOfMoney >= product.getValue();
  }

  private findProductByName(productName: string): Product {
    const product = this.productList.find(
      (product) => product.getName() === productName
    );

    if (!product) {
      throw new Error("指定された商品は存在しません。");
    }

    return product;
  }

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
