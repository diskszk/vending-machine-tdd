import { VendingMachine } from "../VendingMachine";

class Product {
  constructor(readonly name: string, readonly value: number) {}
}

export class ProductDisplayCase {
  // 外に出す
  product = new Product("Cola", 100);

  getProduct(vendingMachine: VendingMachine, productName: string) {
    if (!this.product) {
      throw new Error("該当する商品は販売していません。");
    }
    const totalAmountOfMoney = vendingMachine.getTotalAmountOfMoney();

    if (totalAmountOfMoney < this.product.value) {
      throw new Error("投入金額が不足しています。");
    }
    return this.product;
  }
}
