import { model } from 'mongoose';
import { WalletSchema } from '../schemas/WalletSchema';

export const WalletModel = model('Wallet', WalletSchema, 'wallets');