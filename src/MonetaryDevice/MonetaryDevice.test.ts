import { MonetaryDevice } from "./MonetaryDevice";
describe("MonetaryDevice", () => {
  test("投入コインをMoney型に変換する", () => {
    const monetaryDevice = new MonetaryDevice();
    const money = monetaryDevice.conversionCoinToMoney("100円");

    expect(money.getValue()).toBe(100);
  });

  /*
    お題6. 使えるコイン
    VendingMachineでテストしたからここで行う必要は無し
   */
});
