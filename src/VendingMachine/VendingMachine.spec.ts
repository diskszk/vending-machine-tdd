import { VendingMachine } from "./VendingMachine";
import { MonetaryDevice } from "../MonetaryDevice";
import { ProductDisplayCase } from "../ProductDisplayCase/ProductDisplayCase";

describe("VendingMachine", () => {
  // お題2. お金を払う
  test("100円コインを2回投入すると、自動販売機は合計200円分の価値を持つことになる", () => {
    const vendingMachine = new VendingMachine();
    MonetaryDevice.insertMoney(vendingMachine, "100円");
    MonetaryDevice.insertMoney(vendingMachine, "100円");

    const result = vendingMachine.getTotalAmountOfMoney();

    expect(result).toBe(200);
  });

  test("100円コインを投入してからボタンを押すとコーラが出る", () => {
    const vendingMachine = new VendingMachine();

    MonetaryDevice.insertMoney(vendingMachine, "100円");

    const result = new ProductDisplayCase().getProduct(vendingMachine, "Cola");

    expect(result.name).toBe("Cola");
  });

  test("お金を投入しないでコーラを購入しようとすると失敗する", () => {
    const vendingMachine = new VendingMachine();

    function tryToBuyColaByFree() {
      new ProductDisplayCase().getProduct(vendingMachine, "Cola");
    }

    expect(tryToBuyColaByFree).toThrow("投入金額が不足しています。");
  });
});
