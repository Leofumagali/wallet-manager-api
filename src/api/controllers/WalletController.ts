import { Request, Response } from 'express';
import { AddWalletDTO } from "../../domain/dto/AddWalletDTO";
import { UpdateWalletDTO } from '../../domain/dto/UpdateWalletDTO';
import { container } from '../../infra/inversify/inversify.config';
import { TYPES } from '../../infra/inversify/types';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { WalletService } from '../../domain/services/WalletService';
import { Types } from 'mongoose';
import { injectable } from 'inversify';

@injectable()
export class WalletController {
  private walletService: WalletService;

  constructor() {
    this.walletService = container.get<WalletService>(TYPES.WalletService);
  }

  async addWallet(req: Request, res: Response) {
    try {
      const walletDTO = plainToClass(AddWalletDTO, req.body);

      const errors = await validate(walletDTO);
      if (errors.length > 0) {
        return res.status(400).json(errors);
      }
      
      const newWallet = await this.walletService.addWallet(walletDTO);
      return res.status(201).json(newWallet);
    } catch {
      res.status(400).json({status: 'failure', message: 'Failed to add wallet'});
    }
  }
  
  async updateWallet(req: Request, res: Response) {
    try {
      const walletDTO = plainToClass(UpdateWalletDTO, { ...req.body });
      const errors = await validate(walletDTO);

      if (errors.length > 0) {
        return res.status(400).json(errors);
      }

      const updatedWallet = await this.walletService.updateWallet(new Types.ObjectId(req.params.id), walletDTO);

      if (!updatedWallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }

      return res.status(200).json(updatedWallet);
    } catch {
      res.status(500).json({status: 'failure', message: 'Failed to update wallet'});
    }
  } 

  async deleteWallet(req: Request, res: Response) {
    try { 
      const { id } = req.params;

      const deletedWallet = await this.walletService.deleteWallet(new Types.ObjectId(id));

      if (!deletedWallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }

      return res.status(204).json();
    } catch {
      res.status(500).json({status: 'failure', message: 'Failed to delete wallet'});
    }
  }

  async getAllWallets(req: Request, res: Response) {
    try {
      const wallets = await this.walletService.getAllWallets();

      return res.status(200).json(wallets);
    } catch {
      res.status(500).json({status: 'failure', message: 'Failed to list wallets'});
    }
  }

  async getWalletById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const wallet = await this.walletService.getWalletById(new Types.ObjectId(id));

      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }

      res.status(200).json(wallet);
    } catch {
      res.status(500).json({status: 'failure', message: 'Failed to find wallet'});
    }
  }
}