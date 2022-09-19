import { VendingMachine } from "../VendingMachine";
import { MonetaryDevice } from "./MonetaryDevice";

// お題2. お金を払う
describe("MonetaryDevice", () => {
  const vendingMachine = new VendingMachine();

  test("100円コインを投入する", () => {
    const result = MonetaryDevice.insertMoney(vendingMachine, "100円");
    expect(result.amount).toBe(100);
  });

  test("100円コイン以外は投入できない", () => {
    function tryToInsert500Coin() {
      MonetaryDevice.insertMoney(vendingMachine, "500円");
    }

    expect(tryToInsert500Coin).toThrow("100円コイン以外は投入できません。");
  });
});
