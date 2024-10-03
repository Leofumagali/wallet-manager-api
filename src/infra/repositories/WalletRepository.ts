import { IWalletRepository } from '../../domain/interfaces/IWalletRepository';
import { WalletModel } from '../database/models/WalletModel';
import { Wallet } from '../../entities/Wallet';
import { injectable } from 'inversify';
import { Types } from 'mongoose';

@injectable()
export class WalletRepository implements IWalletRepository {
  async add(wallet: Wallet): Promise<Wallet> {
    try {
      const newWallet = new WalletModel(wallet);
      const savedWallet = await newWallet.save();

      return savedWallet.toObject();
    } catch (error) {
      console.error("Error adding wallet:", error);
      throw new Error("Failed to add wallet");
    }
  }

  async getAll(): Promise<Wallet[]> {
    try {
      return await WalletModel.find().lean();
    } catch (error) {
      console.error("Error fetching all wallets:", error);
      throw new Error("Failed to fetch all wallets");
    }
  }

  async getById(id: Types.ObjectId): Promise<Wallet | null> {
    try {
      return await WalletModel.findById(id).lean();
    } catch (error) {
      console.error(`Error fetching wallet with ID ${id}:`, error);
      throw new Error(`Failed to fetch wallet with ID ${id}`);
    }
  }

  async update(id: Types.ObjectId, walletData: Wallet): Promise<Wallet | null> {
    try {
      return await WalletModel.findByIdAndUpdate(id, walletData, { new: true }).lean();
    } catch (error) {
      console.error(`Error updating wallet with ID ${id}:`, error);
      throw new Error(`Failed to update wallet with ID ${id}`);
    }
  }

  async delete(id: Types.ObjectId): Promise<boolean> {
    try {
      const result = await WalletModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      console.error(`Error deleting wallet with ID ${id}:`, error);
      throw new Error(`Failed to delete wallet with ID ${id}`);
    }
  }
}
