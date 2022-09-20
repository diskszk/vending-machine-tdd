import { MonetaryDevice } from "../MonetaryDevice";
import { Product } from "../Product";

export class VendingMachine {
  constructor(
    private readonly productList: Product[],

    // 金銭装置instanceを作っておいて使い回す
    // instanceを作る場所がここであっているか？
    private readonly monetaryDevice: MonetaryDevice = new MonetaryDevice(),
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
      const money = this.monetaryDevice.conversionCoinToMoney(current);
      return prev + money.getValue();
    }, 0);

    return new VendingMachine(
      this.productList,
      this.monetaryDevice,
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
