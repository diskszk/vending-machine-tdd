import { Money } from "./Money";
describe("Money", () => {
  test("投入コインをMoney型に変換する", () => {
    const result = Money.conversionCoinToMoney("100円");

    expect(result.amount).toBe(100);
  });
});
