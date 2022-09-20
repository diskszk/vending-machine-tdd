import { VendingMachine } from "./VendingMachine";
import { Product } from "../Product/Product";

describe("NewVendingMachine", () => {
  let vendingMachine: VendingMachine;
  beforeEach(() => {
    const productList = [new Product("Cola", 100)];
    vendingMachine = new VendingMachine(productList);
  });

  // お題2. お金を払う
  test("100円を払ってコーラを購入する", () => {
    const inserted100Vm = vendingMachine.insertMoney(["100円"]);
    const product = inserted100Vm.buyProduct("Cola");

    expect(product.getName()).toBe("Cola");
  });

  test("100円以外は投入できない", () => {
    function tryToInsert500yen() {
      vendingMachine.insertMoney(["500円"]);
    }

    expect(tryToInsert500yen).toThrow("100円コイン以外は投入できません。");
  });

  test("投入した金額が足りない場合、購入できない", () => {
    function tryToColaForFree() {
      vendingMachine.buyProduct("Cola");
    }

    expect(tryToColaForFree).toThrow("投入金額が足りません。");
  });
});
