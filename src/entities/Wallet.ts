import { Types } from 'mongoose';

export interface Wallet {
  _id?: Types.ObjectId;
  name: string;
  address: string;
  network: {
    name: string;
    rpcUrl: string;
    currencySymbol: string;
    blockExplorer: string;
  };
}
