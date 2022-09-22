export class Money {
  constructor(readonly value: number) {
    if (value < 0) {
      throw new Error("不正な金額が投入されました。");
    }
  }

  add(addend: Money): Money {
    return new Money(this.value + addend.value);
  }
}

