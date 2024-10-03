import { Types } from 'mongoose';
import { Wallet } from '../../entities/Wallet';

export interface IWalletRepository {
  add(wallet: Wallet): Promise<Wallet>;
  update(id: Types.ObjectId, wallet: Wallet): Promise<Wallet | null>;
  delete(id: Types.ObjectId): Promise<boolean>;
  getById(id: Types.ObjectId): Promise<Wallet | null>;
  getAll(): Promise<Wallet[]>;
}