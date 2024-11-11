import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  constructor() {
    this.products = [
      { name: "콜라", price: 1000, stock: 10, promotion: "탄산2+1" },
      { name: "사이다", price: 1000, stock: 8, promotion: "탄산2+1" },
      { name: "오렌지주스", price: 1800, stock: 9, promotion: "MD추천상품" },
      { name: "탄산수", price: 1200, stock: 5, promotion: "탄산2+1" },
      { name: "물", price: 500, stock: 10 },
      { name: "비타민워터", price: 1500, stock: 6 },
      { name: "감자칩", price: 1500, stock: 5, promotion: "반짝할인" },
      { name: "초코바", price: 1200, stock: 5, promotion: "MD추천상품" },
      { name: "에너지바", price: 2000, stock: 5 },
      { name: "정식도시락", price: 6400, stock: 8 },
      { name: "컵라면", price: 1700, stock: 10, promotion: "MD추천상품" },
    ];
  }

  async run() {
    const readline = MissionUtils.Console.readLineAsync;
    while (true) {
      const input = await readline("구매할 상품을 입력하세요: ");
      try {
        const parsedInput = this.parseInput(input);
        this.processOrder(parsedInput);
        MissionUtils.Console.print(this.getProductsList());
      } catch (error) {
        MissionUtils.Console.print(error.message);
        break;
      }
    }
  }

  parseInput(input) {
    return input.split(",").map((item) => {
      const [name, quantity] = item
        .replace("[", "")
        .replace("]", "")
        .split("-");
      return { name, quantity: parseInt(quantity) };
    });
  }

  processOrder(order) {
    order.forEach(({ name, quantity }) => {
      const product = this.products.find((p) => p.name === name);
      if (!product || product.stock < quantity) {
        throw new Error(
          "[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요."
        );
      }
      product.stock -= quantity;
    });
  }

  getProductsList() {
    return this.products
      .map((product) => {
        const promotion = product.promotion ? ` ${product.promotion}` : "";
        const stockStatus =
          product.stock > 0 ? `${product.stock}개` : "재고 없음";
        return `- ${product.name} ${product.price}원 ${stockStatus}${promotion}`;
      })
      .join("\n");
  }
}

export default App;
