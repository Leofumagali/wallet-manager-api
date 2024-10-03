import { Schema } from 'mongoose';

export const WalletSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  network: { 
    type: {
      name: { type: String, required: true },
      rpcUrl: { type: String, required: true },
      currencySymbol: { type: String, required: true },
      blockExplorer: { type: String, required: true },
    }, 
    required: true
  },
});
