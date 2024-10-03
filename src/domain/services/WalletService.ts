import { IWalletRepository } from '../interfaces/IWalletRepository';
import { Wallet } from '../../entities/Wallet';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../infra/inversify/types';
import { Types } from 'mongoose';

@injectable()
export class WalletService {
  private walletRepository: IWalletRepository;
  
  constructor(
    @inject(TYPES.WalletRepository) walletRepository: IWalletRepository
  ) {
    this.walletRepository = walletRepository;
  }

  async addWallet(walletData: Wallet): Promise<Wallet> {
    return this.walletRepository.add(walletData);
  }

  async updateWallet(id: Types.ObjectId, walletData: Wallet): Promise<Wallet | null> {
    return this.walletRepository.update(id, walletData);
  }

  async deleteWallet(id: Types.ObjectId): Promise<boolean> {
    return this.walletRepository.delete(id);
  }

  async getWalletById(id: Types.ObjectId): Promise<Wallet | null> {
    return this.walletRepository.getById(id);
  }

  async getAllWallets(): Promise<Wallet[]> {
    return this.walletRepository.getAll();
  }
}
