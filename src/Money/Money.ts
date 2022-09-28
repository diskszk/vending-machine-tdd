export class Money {
  constructor(readonly value: number) {
    this.validate(value);
  }

  private validate(value: number): void {
    if (value < 0) {
      throw new Error("不正な金額が投入されました。");
    }
  }
}
