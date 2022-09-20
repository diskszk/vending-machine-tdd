export class Product {
  constructor(private readonly name: string, private readonly value: number) {}

  getName(): string {
    return this.name;
  }
  getValue(): number {
    return this.value;
  }
}
