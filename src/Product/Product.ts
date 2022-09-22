export class Product {
  constructor(readonly name: string, readonly value: number) {
    if (!name || value < 0) {
      throw new Error("不正な製品が投入されました。");
    }
  }
}
