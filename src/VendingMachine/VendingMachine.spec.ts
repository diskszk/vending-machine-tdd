import { VendingMachine } from "./VendingMachine";
import { Product } from "../Product";

describe("VendingMachine", () => {
  let vendingMachine: VendingMachine;
  beforeEach(() => {
    const productList = [new Product("Cola", 100)];
    vendingMachine = new VendingMachine(productList);
  });

  // お題2. お金を払う
  test("100円を払ってコーラを購入する", () => {
    const inserted100Vm = vendingMachine.insertMoney([100]);
    const { product } = inserted100Vm.buyProduct("Cola");

    expect(product.name).toBe("Cola");
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
    const insertedCoinVm = vendingMachine.insertMoney([100]);

    const { product } = insertedCoinVm.buyProduct("OolongTea");
    expect(product.name).toBe("OolongTea");
  });

  // お題4. レッドブルを追加
  test("200円を払ってレッドブルを購入する", () => {
    const productList = [new Product("RedBull", 200)];
    const vendingMachine = new VendingMachine(productList);
    const insertedCoinVm = vendingMachine.insertMoney([100, 100]);

    const { product } = insertedCoinVm.buyProduct("RedBull");
    expect(product.name).toBe("RedBull");
  });

  // お題5. 入れたお金に応じて、購入できる商品のボタンが光る
  test("100円を入れたとき、コーラのボタンは光り、レッドブルのボタンは光らない", () => {
    const productList = [new Product("Cola", 100), new Product("RedBull", 200)];
    const vendingMachine = new VendingMachine(productList);
    const insertedCoinVm = vendingMachine.insertMoney([100]);

    expect(insertedCoinVm.isButtonLit("Cola")).toBe(true);
    expect(insertedCoinVm.isButtonLit("RedBull")).toBe(false);
  });

  // お題6. 100円コインの他に、10円、50円、500円コインも使える
  describe("100円コインの他に、10円、50円、500円コインも使える", () => {
    const vendingMachine = new VendingMachine([]);

    test("10円, 50円, 100円, 500円のいずれを投入してもエラーが起きない", () => {
      function tryToInsertValidCoins() {
        vendingMachine.insertMoney([10, 50, 100, 500]);
      }
      expect(tryToInsertValidCoins).not.toThrow();
    });
    test("5円コインは使用できない", () => {
      function tryToInsert5Coin() {
        vendingMachine.insertMoney([5]);
      }

      expect(tryToInsert5Coin).toThrow("使用不可能な貨幣が投入されました。");
    });
  });

  // お題7. お釣り
  describe("お金を入れボタンを押して飲み物を買うと、お釣りが出る", () => {
    let vendingMachine: VendingMachine;
    beforeEach(() => {
      const productList = [
        new Product("Cola", 100),
        new Product("OolongTea", 100),
      ];
      vendingMachine = new VendingMachine(productList);
    });

    test("100円を投入し100円でコーラを買ったあと、追加で100円を投入しないとウーロン茶を購入できない", () => {
      const inserted = vendingMachine.insertMoney([100]);

      // 購入する
      const { nextVendingMachine } = inserted.buyProduct("Cola");

      expect(nextVendingMachine.isButtonLit("OolongTea")).toBe(false);

      const nextInserted = nextVendingMachine.insertMoney([100]);

      expect(nextInserted.isButtonLit("OolongTea")).toBe(true);
    });

    test("500円を投入して100円のコーラを買ったとき、400円お釣りが出る", () => {
      const inserted = vendingMachine.insertMoney([500]);
      const { change } = inserted.buyProduct("Cola");

      expect(change.value).toBe(400);
    });
  });

  // お題8. 返却ボタン
  describe("飲み物を買わなくても、返却ボタンを押すと投入したお金が戻ってくる", () => {
    test("500円を投入し返却ボタン押したとき、500円が帰ってくる", () => {
      const inserted = vendingMachine.insertMoney([500]);
      const result = inserted.repay();

      expect(result.value).toBe(500);
    });
  });
});
