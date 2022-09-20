import { VendingMachine } from "./VendingMachine";
import { Product } from "../Product/Product";

describe("VendingMachine", () => {
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

  // お題3. ウーロン茶追加
  test("100円を払ってウーロン茶を購入する", () => {
    const productList = [new Product("OolongTea", 100)];
    const vendingMachine = new VendingMachine(productList);
    const insertedCoinVm = vendingMachine.insertMoney(["100円"]);

    const result = insertedCoinVm.buyProduct("OolongTea");
    expect(result.getName()).toBe("OolongTea");
  });

  // お題4. レッドブルを追加
  test("200円を払ってレッドブルを購入する", () => {
    const productList = [new Product("RedBull", 200)];
    const vendingMachine = new VendingMachine(productList);
    const insertedCoinVm = vendingMachine.insertMoney(["100円", "100円"]);

    const result = insertedCoinVm.buyProduct("RedBull");
    expect(result.getName()).toBe("RedBull");
  });

  // お題5. 入れたお金に応じて、購入できる商品のボタンが光る
  test("100円を入れたとき、コーラのボタンは光り、レッドブルのボタンは光らない", () => {
    const productList = [new Product("Cola", 100), new Product("RedBull", 200)];
    const vendingMachine = new VendingMachine(productList);
    const insertedCoinVm = vendingMachine.insertMoney(["100円"]);

    expect(insertedCoinVm.isButtonLit("Cola")).toBe(true);
    expect(insertedCoinVm.isButtonLit("RedBull")).toBe(false);
  });
});
