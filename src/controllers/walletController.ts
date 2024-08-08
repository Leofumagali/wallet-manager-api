import { Request, Response } from 'express';
import { AddWalletDTO } from "../dto/AddWalletDTO";
import { Wallet } from '../models/Wallet';
import { uuid } from 'uuidv4';
import { db } from '../database/InMemoryDatabase';

export class walletController {
  static async addWallet(req: Request, res: Response) {
    const walletDTO = new AddWalletDTO();

    walletDTO.address = req.body.address;
    walletDTO.network = req.body.network;

    const wallet = new Wallet(uuid(), walletDTO.address, walletDTO.network);
    
    db.create(wallet.id, wallet);

    res.status(201).json(wallet);
  }

}