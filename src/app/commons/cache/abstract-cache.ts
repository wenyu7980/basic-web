export abstract class AbstractCache<T> {
  private local: Storage;
  private value: T;

  constructor(private name: string) {
    this.local = localStorage;
  }

  getValue(): T {
    if (this.value) {
      return this.value;
    }
    this.value = this.deserialize(this.local.getItem(this.name));
    return this.value;
  }

  setValue(value: T) {
    this.value = value;
    this.local.setItem(this.name, this.serialize(value));
  }

  protected serialize(value: T): string {
    return JSON.stringify(value);
  }

  protected deserialize(obj: string): T {
    return JSON.parse(obj);
  }
}
