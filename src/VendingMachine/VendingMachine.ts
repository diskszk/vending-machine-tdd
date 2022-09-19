export class VendingMachine {
  private totalAmountOfMoney = 0;

  addMoney(amount: number): void {
    this.totalAmountOfMoney += amount;
  }

  getTotalAmountOfMoney(): number {
    return this.totalAmountOfMoney;
  }
}
