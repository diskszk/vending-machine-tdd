import { VendingMachine } from "./VendingMachine";
import { Product } from "../Product";

describe("VendingMachine", () => {
  // お題2. お金を払う
  describe("お金を払って商品を購入する", () => {
    let vendingMachine: VendingMachine;
    beforeEach(() => {
      const productList = [new Product("Cola", 100)];
      vendingMachine = new VendingMachine(productList);
    });

    test("100円を払ってコーラを購入する", () => {
      vendingMachine.insertCoins([100]);
      const cola = vendingMachine.buyProduct("Cola");

      expect(cola.name).toBe("Cola");
    });

    test("投入した金額が足りない場合、購入できない", () => {
      function tryToColaForFree() {
        vendingMachine.buyProduct("Cola");
      }

      expect(tryToColaForFree).toThrow("投入金額が足りません。");
    });

    test("200円を投入してコーラを2つ購入する", () => {
      const boughtProductList: Product[] = [];

      vendingMachine.insertCoins([100, 100]);

      boughtProductList.push(vendingMachine.buyProduct("Cola"));
      boughtProductList.push(vendingMachine.buyProduct("Cola"));

      expect(boughtProductList).toEqual([
        new Product("Cola", 100),
        new Product("Cola", 100),
      ]);
    });

    // お題3. ウーロン茶追加
    test("100円を払ってウーロン茶を購入する", () => {
      const vendingMachine = new VendingMachine([
        new Product("OolongTea", 100),
      ]);
      vendingMachine.insertCoins([100]);

      const oolongTea = vendingMachine.buyProduct("OolongTea");
      expect(oolongTea.name).toBe("OolongTea");
    });

    // お題4. レッドブルを追加
    test("200円を払ってレッドブルを購入する", () => {
      const vendingMachine = new VendingMachine([new Product("RedBull", 200)]);
      vendingMachine.insertCoins([100, 100]);

      const redBull = vendingMachine.buyProduct("RedBull");
      expect(redBull.name).toBe("RedBull");
    });

    // お題5. 入れたお金に応じて、購入できる商品のボタンが光る
    test("100円を入れたとき、コーラのボタンは光り、レッドブルのボタンは光らない", () => {
      const productList = [
        new Product("Cola", 100),
        new Product("RedBull", 200),
      ];
      const vendingMachine = new VendingMachine(productList);
      vendingMachine.insertCoins([100]);

      expect(vendingMachine.isButtonLit("Cola")).toBe(true);
      expect(vendingMachine.isButtonLit("RedBull")).toBe(false);
    });

    // お題6. 100円コインの他に、10円、50円、500円コインも使える
    test("10円, 50円, 100円, 500円のいずれを投入してもエラーが起きない", () => {
      function tryToInsertValidCoins() {
        vendingMachine.insertCoins([10, 50, 100, 500]);
      }
      expect(tryToInsertValidCoins).not.toThrow();
    });
    test("5円コインは使用できない", () => {
      function tryToInsert5Coin() {
        vendingMachine.insertCoins([5]);
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
      vendingMachine.insertCoins([100]);

      // 購入する
      const _cola = vendingMachine.buyProduct("Cola");

      expect(vendingMachine.isButtonLit("OolongTea")).toBe(false);

      vendingMachine.insertCoins([100]);

      expect(vendingMachine.isButtonLit("OolongTea")).toBe(true);
    });

    test("500円を投入して100円のコーラを買ったとき、400円お釣りが出る", () => {
      vendingMachine.insertCoins([500]);
      const _cola = vendingMachine.buyProduct("Cola");

      const repayment = vendingMachine.repay();

      expect(repayment.value).toBe(400);
    });
  });

  // お題8. 返却ボタン
  describe("飲み物を買わなくても、返却ボタンを押すと投入したお金が戻ってくる", () => {
    test("500円を投入し返却ボタン押したとき、500円が帰ってくる", () => {
      const vendingMachine = new VendingMachine([]);
      vendingMachine.insertCoins([500]);
      const repayment = vendingMachine.repay();

      expect(repayment.value).toBe(500);
    });
  });
});
