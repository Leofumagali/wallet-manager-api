import { Wallet } from "../models/Wallet";

interface Data {
  [key: string]: string | number | Wallet
}

class InMemoryDatabase {
  private data: Data = {};

  create(key: string, value: Wallet) {
    this.data[key] = value;
  }

  read(key: string) {
    return this.data[key];
  }

  update(key: string, value: string | number) {
    this.data[key] = value;
  }

  delete(key: string) {
    delete this.data[key];
  }

}

export const db = new InMemoryDatabase();